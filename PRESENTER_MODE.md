# Presenter View

The Email Apex Quick Quote demo includes a PowerPoint-style presenter view for giving live demonstrations.

## Activating Presenter Mode

1. **From URL**: Add `?demo=presenter` to the URL
   ```
   http://localhost:5173/?demo=presenter
   ```

2. **From UI**: Select "Presenter" mode from the demo mode picker in the left rail

3. **Keyboard Shortcut**: Press `P` when in presenter mode to toggle the presenter view on/off

## Features

### Left Panel (Main View)
- **Live Preview**: Shows the actual demo application at 85% scale
- **Fully Interactive**: You can click and interact with the demo in real-time
- **Navigation Controls**: Arrow buttons to move forward/backward through the workflow
- **Status Display**: Shows current inbox and workflow stage

### Right Panel (Presenter Tools)
- **Next Step Preview**: Visual hint of what comes next in the workflow
- **Speaker Notes**: Context-aware notes that explain:
  - What the current screen shows
  - Key points to highlight
  - What actions to demonstrate next
- **Navigation**: Quick back/next buttons with workflow progress

### Top Bar
- **Timer**: Session timer with play/pause and reset controls
- **Clock**: Current time display
- **Theme Toggle**: Switch between light and dark modes
- **Exit Button**: Return to normal view

## Keyboard Shortcuts

- `P` - Toggle presenter view on/off
- `` ` `` (backtick) - Toggle demo hints
- `←` / `→` - Navigate backward/forward
- `Esc` - Exit presenter view (when focused on header)

## Speaker Notes

The system automatically displays context-aware notes based on:
1. **Specific Email**: When viewing a particular email
2. **Workflow Stage**: During compose, approval, or sending states
3. **Active Folder**: CSR Inbox, Apex Quote Inbox, Auto Quoted, or Review

## Tips for Presenters

1. **Start in Normal Mode**: Let the audience see the full application first
2. **Enter Presenter Mode**: Press `P` to switch to presenter view for complex workflows
3. **Use the Notes**: Reference speaker notes to maintain flow and hit key points
4. **Watch the Timer**: Keep track of demo duration
5. **Theme Switching**: Use dark mode for low-light presentation rooms

## Workflow Navigation

The presenter view respects the demo's state history:
- **Back**: Returns to previous state (email selection, workflow stage)
- **Next**: Advances the workflow (triggers refresh, opens compose, etc.)

This ensures you can demonstrate forward progress or backtrack to explain earlier steps without breaking the demo flow.

## Customization

To add or modify speaker notes, edit:
```
src/app/components/PresenterView.tsx
```

Look for the `PRESENTER_NOTES` object to add notes for specific:
- Email IDs (e.g., 'csr-stonite-qty')
- Workflow stages (e.g., 'review-composing')
- Folder views (e.g., 'auto-quoted-folder')
