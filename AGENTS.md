<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- **Stack**: Next.js 16.2.4 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS 4. No backend, no database — all data is stored in browser `localStorage`.
- **Dev server**: `npm run dev` starts on `http://localhost:3000`. Hot reloading works out of the box.
- **Lint**: `npm run lint` (ESLint via `eslint-config-next`).
- **Build**: `npm run build` — note there is a pre-existing TypeScript error (`estimatedMinutes` property on `Quiz` type in `src/app/dashboard/page.tsx`). The dev server is unaffected since `next dev` does not block on type errors.
- **No tests configured**: There is no test framework (jest/vitest/playwright) in the project dependencies.
- **No env vars or secrets needed**: The app is fully client-side with no external service dependencies.
- **Quiz data schema**: There are two competing type definition files (`src/types/index.ts` and `src/types/quiz.ts`). When working with quiz data, verify which schema the actual quiz data JSON files follow before writing code.
