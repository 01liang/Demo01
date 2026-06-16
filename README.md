# Work Order Dashboard

Vue 3 front-end case for a simplified work order table and project-hours chart.

## Features

- Login simulation: `admin` gets administrator permission, other usernames get regular user permission.
- Work order table with mock data.
- Admin-only Delete action.
- ECharts bar chart: `Project Hours Distribution`.
- Chart updates automatically after deleting a work order.
- Unit tests for permission and work order aggregation logic.

## Tech Stack

- Vue 3
- Vite
- TypeScript
- Less
- Ant Design Vue
- ECharts
- Vitest

## Run Locally

```bash
npm install
npm run dev
```

## Test And Build

```bash
npm run test
npm run build
```

## AI Usage Notes

I used ChatGPT/Codex as an AI coding assistant for scaffolding the Vue project, drafting the page structure, extracting permission and aggregation logic, and writing unit tests.

AI-assisted code includes the initial component layout, ECharts option structure, utility functions, and test cases. I reviewed and adjusted the implementation to match the requirement details: admin-only deletion, automatic chart refresh, Ant Design Vue table behavior, responsive layout, and delivery scripts.

The most satisfying part is keeping the table and chart linked through a small, testable data model instead of putting all logic inside the component. The trickiest part is balancing a complete interaction flow with a compact case-study codebase.

## Deployment

This project can be deployed to Vercel, Netlify, CodeSandbox, or any static host that supports Vite.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```
