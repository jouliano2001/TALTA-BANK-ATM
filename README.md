# TALTA Bank ATM

A front-end-only React + Vite ATM experience that keeps the ATM machine visible at all times and runs the whole journey inside the machine screen area.

## Run

```bash
npm install
npm run dev
```

Validation:

```bash
npm run build
npm run lint
```

## Editable Content

- Welcome text, language labels, service button labels, table headings, and table rows:
  `src/content/atmContent.ts`
- Idle ATM screen placeholder image:
  `src/assets/atm-idle-placeholder.svg`
- Purchase / image screen placeholder:
  `src/assets/purchase-placeholder.svg`

## Project Structure

```text
src/
├── assets/
│   ├── atm-idle-placeholder.svg
│   ├── purchase-placeholder.svg
│   └── ChatGPT Image Apr 16, 2026, 03_48_59 PM.png
├── components/
│   ├── atm/
│   │   ├── AtmActionButton.tsx
│   │   ├── AtmCallout.tsx
│   │   └── AtmMachine.tsx
│   └── ui/
│       ├── button.tsx
│       └── table.tsx
├── content/
│   └── atmContent.ts
├── lib/
│   └── utils.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Notes

- The experience is state-driven instead of route-heavy.
- The ATM body stays visible through idle, zoom, service selection, table, and image states.
- The local placeholder assets are simple to replace later with real images.
