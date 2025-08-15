# React Page Builder

React Page Builder is a monorepo for building a modular page builder in React. It contains reusable packages for the editor, schema, UI components and utilities, along with a Next.js web application for running the builder.

## Workspace Layout

- `packages/` – shared libraries used by the project:
  - `editor` – core page editor functionality.
  - `schema` – shared data models and validation.
  - `ui` – reusable interface components.
  - `utils` – common utilities.
- `web/` – Next.js application that hosts the page builder UI.

## Development Scripts

At the repository root scripts are orchestrated with [Turborepo](https://turbo.build/):

- `pnpm dev` – run development servers for all packages in parallel.
- `pnpm build` – build all packages.
- `pnpm typecheck` – run TypeScript type checks across the workspace.

To work on the Next.js site directly you can run scripts inside the `web` package:

- `pnpm --filter web dev` – start the Next.js development server.
- `pnpm --filter web build` – build the production app.
- `pnpm --filter web start` – run the built app.

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Run the web app in development**

   ```bash
   pnpm --filter web dev
   ```

   The application will be available at <http://localhost:3000>.

3. **Build the entire workspace**

   ```bash
   pnpm build
   ```

## License

This project is licensed under the MIT License.

