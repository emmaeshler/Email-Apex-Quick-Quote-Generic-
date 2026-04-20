# Apex Email Demo Workflows

This document outlines all four demo workflows in the Outlook-lookalike prototype, showing how the Apex Quoting System handles different customer scenarios.

---

## Interaction Model

The inbox uses a **user-controlled refresh model** for CEO demos:

- **Empty start**: Completely empty inbox on load
- **Refresh button**: Click to check for new messages (icon in email list header)
- **Small batches**: Each refresh reveals 1-3 related emails, not floods
- **Staggered arrivals**: Emails within a batch arrive with subtle delays (0.3-2.6s)
- **Visual feedback**: New emails slide in with blue highlight, unread badges update
- **Demo hints**: Pulsing dots guide when to refresh or which email to view next
- **Story order preserved**: Workflows unfold in the same sequence, just user-paced
- **Daily summary last**: Summary of yesterday's activity comes at the end of demo (Refresh 5)

---

## Demo Flow Overview

**Phase 0**: Empty inbox, click Refresh to load  
**Phase 1**: View auto-quoted emails (Workflows 1 & 4) via Refresh  
**Phase 2**: Review flagged quote and approve (Workflow 2) via Refresh  
**Phase 3**: View resolved quote, then forward direct customer email (Workflow 3) via Refresh  
**Phase 4**: View customer reply thread  
**Phase 5**: Refresh and view daily summary

---

## Refresh Sequence

### Initial State
- **CSR Inbox**: Empty
- **EIS Inbox**: Empty
- **Refresh button**: **Active** (blue, "New messages available")
- **Demo hint**: Pulsing dot on Refresh button

### Refresh 1: Workflow 1 - RCSCA Auto-Quote
**Batch**: 3 emails arrive with staggered timing
1. T+0.3s: `eis-1` (Jawinder's request in EIS inbox)
2. T+1.4-1.8s: `eis-1-response` (Auto-quote response in EIS inbox)
3. T+2.6-3.4s: `csr-ai-1` (CC notification in CSR inbox, auto-selected)

**Hint flow**: Refresh button → `csr-ai-1` email (auto-selected)

### Refresh 2: Workflow 4 - Tri-State Auto-Quote
**Batch**: 3 emails arrive with staggered timing
1. T+0.3s: `eis-6` (Dave's request in EIS inbox)
2. T+1.4-1.8s: `eis-6-response` (Auto-quote response in EIS inbox)
3. T+2.6-3.4s: `csr-ai-2` (CC notification in CSR inbox)

**Hint flow**: After viewing `csr-ai-1` → Refresh button → `csr-ai-2` email

### Refresh 3: Workflow 2 - Stonite Review Request
**Batch**: 2 emails arrive with staggered timing
1. T+0.3s: `eis-5` (Steve's flagged request in EIS inbox)
2. T+1.4-1.8s: `csr-review-1` (Review request in CSR inbox)

**Hint flow**: After viewing `csr-ai-2` → Refresh button → `csr-review-1` email

### Refresh 4: Workflow 3 - Herman's Direct Email
**Batch**: 1 email
1. T+0.3s: `csr-forward-1` (Herman's email in CSR inbox)

**Hint flow**: After Stonite review resolved → view `csr-stonite-final-cc` → Refresh button → `csr-forward-1`

### Refresh 5: Daily Summary
**Batch**: 1 email
1. T+0.3s: `csr-daily-summary` (Yesterday's quoting summary in CSR inbox)

**Hint flow**: After viewing `csr-herman-reply` → Refresh button → `csr-daily-summary`

---

## Workflow 1: RCSCA Auto-Quote (Adhesive & Activator)

**Customer**: Jawinder Schahal (RCSCA)  
**Type**: Simple auto-quote with MOQ adjustments  
**Trigger**: Refresh 1

### Emails in Batch
- `eis-1` — Jawinder's original quote request in EIS inbox
- `eis-1-response` — Auto-quote response in EIS inbox
- `csr-ai-1` — CC notification in CSR inbox ← **Demo focuses here** (auto-selected)

### User Actions
1. **Click Refresh** (demo hint on button, inbox is empty)
2. **View** `csr-ai-1` in CSR inbox (auto-selected, demo hint on email)
   - Shows auto-quoted email with CC badge
   - Quote #Q-1093928: $192.01 for ADH-X315 and ACT-Z788
   - System adjusted quantities to meet MOQ requirements
   - Includes cold-pack shipping note

### Key Features Demonstrated
- ✅ Auto-quoting for simple SKU requests
- ✅ Automatic MOQ adjustments (requested qty → compliant qty)
- ✅ Special shipping requirements (temperature-sensitive materials)
- ✅ CC notification to CSR for awareness

---

## Workflow 2: Stonite Review & Approval (Magnet Wire Round Tapers)

**Customer**: Steve Landers (Stonite Coil Corp)  
**Type**: Review workflow for ambiguous catalog matches  
**Trigger**: Refresh 3

### Emails in Batch
- `eis-5` — Steve's flagged request in EIS inbox
- `csr-review-1` — Review request in CSR inbox

### User Actions
1. **Click Refresh** after viewing `csr-ai-2` (demo hint on Refresh button)

2. **View** `csr-review-1` in CSR inbox (demo hint on email)
   - Shows review request with "Needs Review" badge
   - Displays catalog match analysis for 3 items:
     - #27 HPL round tapers: 25% confidence match
     - #24 SDPZ round tapers: no match found
     - #19 SDPZ round tapers: no match found

3. **Click Reply** button (demo hint)
   - Opens reply composer with pre-populated context

4. **Click Send** button (demo hint)
   - **Stage: sending** (brief processing state)
   
5. **Staggered Email Arrivals** (automatic after send):
   - **T+0.8s**: `csr-review-reply` appears in CSR inbox (Morgan's reply)
   - **T+3-7s**: `eis-stonite-response` arrives in EIS inbox (auto-quote)
   - **T+1-2s later**: `csr-stonite-final-cc` arrives in CSR inbox (CC notification)
   - Each email has 3s highlight animation + unread badge updates

### Key Features Demonstrated
- ✅ Human-in-the-loop review for uncertain matches
- ✅ Catalog match confidence scoring
- ✅ CSR domain expertise (Morgan knows custom SKUs)
- ✅ Review → approval → automated quote generation
- ✅ Live inbox feel with staggered arrivals
- ✅ Quote #Q-8320281: $5,895.00 with lead-time items

---

## Workflow 3: Herman Forward & Auto-Quote (Aramid Braided Tape)

**Customer**: Herman (Motion Industries)  
**Type**: Direct email to CSR, forwarded to quoting system  
**Trigger**: Refresh 4

### Emails in Batch
- `csr-forward-1` — Herman's direct email to Morgan

### User Actions
1. **View** `csr-stonite-final-cc` in CSR inbox (after WF2 completes, demo hint on email)
   - Resolved quote confirmation

2. **Click Refresh** (demo hint on Refresh button)

3. **View** `csr-forward-1` in CSR inbox (demo hint on email)
   - Shows Herman's direct request for P/N BRT40XF17M
   - "Quote Request" badge

4. **Click Forward** button (demo hint)
   - Opens forward composer
   - Pre-filled: To `quotes@apex-corp.com`
   - Pre-filled note: "Herman from Motion needs pricing on BRT40XF17M — forwarding for quoting.\n\n- Morgan"

5. **Click Send** button (demo hint)
   - **Stage: sent** (1.5s delay)
   - `eis-forward-1` appears in EIS inbox with "Processing" badge
   
6. **Processing → Quoted** (automatic after send)
   - **Stage: processing** (2.5s delay)
   - **Stage: quoted**
   - `eis-forward-1-response` appears in EIS inbox (quote response)
   - `csr-forward-cc` appears in CSR inbox (CC notification)
   - `csr-herman-reply` appears in CSR inbox (Herman's warm reply)
   - Original `csr-forward-1` badge updates to "Forwarded & Quoted"

### Key Features Demonstrated
- ✅ CSR forwarding personal relationships to auto-quote system
- ✅ Context preservation through forward chain
- ✅ Multi-stage processing visualization
- ✅ Quote #Q-3018483: $545.50 for braided tape
- ✅ Customer relationship warmth (Herman's friendly reply)

---

## Workflow 4: Tri-State Auto-Quote (Tapered Reel Packaging)

**Customer**: Dave Morrison (Tri-State Coil Winding)  
**Type**: Complex auto-quote with multiple SKUs and availability mix  
**Trigger**: Refresh 2

### Emails in Batch
- `eis-6` — Dave's original request in EIS inbox
- `eis-6-response` — Auto-quote response in EIS inbox
- `csr-ai-2` — CC notification in CSR inbox

### User Actions
1. **Click Refresh** after viewing `csr-ai-1` (demo hint on Refresh button)
2. **View** `csr-ai-2` in CSR inbox (demo hint on email)
   - Shows auto-quoted email with CC badge
   - Quote #Q-4150772: $57,660.40 for 6 SKUs
   - Mix of in-stock and lead-time items
   - LTL truck shipping

### Key Features Demonstrated
- ✅ Auto-quoting for complex multi-SKU requests
- ✅ Stock availability transparency (in-stock vs. lead-time)
- ✅ Large-order logistics (LTL truck shipping)
- ✅ Comprehensive option presentation

---

## Phase 5: Daily Summary Email

**Location**: CSR Inbox  
**Email**: `csr-daily-summary` (from yesterday)  
**Trigger**: Refresh 5 (after completing all workflows)

### User Actions
1. **Click Refresh** after viewing Herman's reply (demo hint on Refresh button)
2. **View** `csr-daily-summary` in CSR inbox (demo hint on email)

### Content
Daily summary showing yesterday's activity:
- 12 quotes sent across 9 customers
- $47,850 total quoted value
- Auto-quote vs. review breakdown
- Top quotes by value
- Product category distribution
- Items flagged for review (including Stonite)

### Key Features Demonstrated
- ✅ Daily activity analytics
- ✅ Performance tracking
- ✅ Exception reporting (flagged items)
- ✅ Business intelligence integration

---

## Demo Hint System

The prototype includes a guided hint system (toggled with ` backtick key):

1. **Phase 0**: Pulse on Refresh button (inbox empty)
2. **Phase 1**: Pulse on `csr-ai-1` (auto-selected) → Refresh button → `csr-ai-2` → Refresh button → `csr-review-1`
3. **Phase 2**: Pulse on Reply button → Send button
4. **Phase 3**: Pulse on `csr-stonite-final-cc` (after arrival) → Refresh button → `csr-forward-1` → Forward button → Send button
5. **Phase 4**: Pulse on `csr-herman-reply`
6. **Phase 5**: Pulse on Refresh button → `csr-daily-summary`

After viewing the daily summary, the demo is considered complete.

---

## Key Inbox Folders

1. **CSR Inbox** (`csr`)
   - Morgan's personal inbox (morgan@apex-corp.com)
   - Contains: CC notifications, review requests, direct customer emails
   - Subfolders: OEM, AM/MRO (decorative)

2. **Apex Quote Inbox** (`eis`)
   - Automated quoting system inbox (quotes@apex-corp.com)
   - Contains: Customer requests, auto-quote responses, forwarded emails
   - Shows quote status badges (Processing, Quoted, Needs Review)

3. **Flagged for Review** (`review`)
   - Virtual folder aggregating items needing human attention
   - Combines flagged items from both CSR and EIS inboxes
   - Clears when review is resolved

---

## Technical Implementation Notes

### State Machine
- `reviewResolved` (boolean): Workflow 2 completion
- `reviewStage` (enum): 'pending' | 'composing' | 'sending' | 'resolved'
- `forwardStage` (enum): 'pending' | 'composing' | 'sent' | 'processing' | 'quoted'

### Arrival System (Workflow 2 Only - Proof of Concept)
- `arrivedEmails` (Set): Tracks which dynamic emails have arrived
- `newEmailIds` (Set): Tracks emails in 3s highlight animation window
- `markEmailArrived()`: Triggers arrival animation + scroll + unread update

### Email Insertion Logic
- Static emails: Defined in `emails.ts` arrays
- Dynamic emails: Conditionally inserted via `useMemo` based on arrival state
- Ordering: `unshift()` ensures newest emails appear at top

---

## Customer Personas

1. **Jawinder Schahal (RCSCA)**: Industrial adhesives buyer, simple SKU requests
2. **Steve Landers (Stonite Coil Corp)**: Magnet wire specialist, custom round tapers
3. **Dave Morrison (Tri-State Coil Winding)**: Operations manager, bulk packaging orders
4. **Herman (Motion Industries)**: Relationship buyer, values fast turnaround

---

## Quote Numbers
- Q-1093928: RCSCA adhesive ($192.01)
- Q-8320281: Stonite magnet wire ($5,895.00)
- Q-3018483: Motion aramid tape ($545.50)
- Q-4150772: Tri-State tapered reels ($57,660.40)
