import { useEffect, useRef, useState } from 'react';

const CHANNEL_NAME = 'presenter-mirror';
const THROTTLE_MS = 16;

interface CursorPos { x: number; y: number; visible: boolean }

/**
 * Build a path of child-indices from the <body> down to `el`.
 * Both windows render the same React tree so the path resolves
 * to the same element regardless of viewport size.
 */
function pathFromBody(el: Element): number[] {
  const path: number[] = [];
  let cur: Element | null = el;
  while (cur && cur !== document.body && cur.parentElement) {
    const parent = cur.parentElement;
    const idx = Array.from(parent.children).indexOf(cur);
    if (idx < 0) break;
    path.unshift(idx);
    cur = parent;
  }
  return path;
}

function resolvePathFromBody(path: number[]): Element | null {
  let el: Element | null = document.body;
  for (const idx of path) {
    if (!el || !el.children[idx]) return null;
    el = el.children[idx];
  }
  return el;
}

// ── Emit (presenter embed iframe) ──────────────────────────────────────────

export function usePresenterEmitSync(enabled: boolean) {
  const chRef = useRef<BroadcastChannel | null>(null);
  const lastRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const ch = new BroadcastChannel(CHANNEL_NAME);
    chRef.current = ch;

    let pending: any = null;

    const flush = () => {
      if (!pending) { return; }
      ch.postMessage(pending);
      pending = null;
      lastRef.current = performance.now();
    };

    const onMove = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const fracX = rect.width > 0 ? (e.clientX - rect.left) / rect.width : 0.5;
      const fracY = rect.height > 0 ? (e.clientY - rect.top) / rect.height : 0.5;
      const path = pathFromBody(target);

      pending = { type: 'cursor', visible: true, path, fracX, fracY };

      if (performance.now() - lastRef.current >= THROTTLE_MS) flush();
      else { cancelAnimationFrame(rafRef.current); rafRef.current = requestAnimationFrame(flush); }
    };

    const onLeave = () => ch.postMessage({ type: 'cursor', visible: false });

    // ── Scroll sync ──
    const scrollMap = new Map<Element, () => void>();
    const attachScroll = () => {
      document.querySelectorAll('[data-scroll-sync]').forEach(el => {
        if (scrollMap.has(el)) return;
        const key = el.getAttribute('data-scroll-sync')!;
        let sraf = 0;
        const h = () => {
          cancelAnimationFrame(sraf);
          sraf = requestAnimationFrame(() => {
            const max = el.scrollHeight - el.clientHeight;
            ch.postMessage({ type: 'scroll', key, pct: max > 0 ? el.scrollTop / max : 0 });
          });
        };
        el.addEventListener('scroll', h, { passive: true });
        scrollMap.set(el, h);
      });
    };
    attachScroll();
    const mo = new MutationObserver(attachScroll);
    mo.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
      scrollMap.forEach((h, el) => el.removeEventListener('scroll', h));
      mo.disconnect();
      ch.close();
    };
  }, [enabled]);
}

// ── Receive (audience window) ──────────────────────────────────────────────

export function usePresenterReceiveSync(enabled: boolean) {
  const [cursor, setCursor] = useState<CursorPos>({ x: 0, y: 0, visible: false });
  const chRef = useRef<BroadcastChannel | null>(null);
  const hideRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const ch = new BroadcastChannel(CHANNEL_NAME);
    chRef.current = ch;

    ch.onmessage = (ev: MessageEvent) => {
      if (ev.data.type === 'cursor') {
        if (!ev.data.visible) {
          setCursor(p => ({ ...p, visible: false }));
        } else {
          const el = resolvePathFromBody(ev.data.path);
          if (el) {
            const rect = el.getBoundingClientRect();
            setCursor({
              x: rect.left + ev.data.fracX * rect.width,
              y: rect.top + ev.data.fracY * rect.height,
              visible: true,
            });
          }
        }
        clearTimeout(hideRef.current);
        if (ev.data.visible) {
          hideRef.current = window.setTimeout(
            () => setCursor(p => ({ ...p, visible: false })),
            3000,
          );
        }
      }

      if (ev.data.type === 'scroll') {
        const el = document.querySelector(`[data-scroll-sync="${ev.data.key}"]`);
        if (el) el.scrollTop = ev.data.pct * (el.scrollHeight - el.clientHeight);
      }
    };

    return () => { clearTimeout(hideRef.current); ch.close(); };
  }, [enabled]);

  return cursor;
}
