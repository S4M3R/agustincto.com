# Agustin Suarez Merino - Personal Portfolio

A personal portfolio website showcasing Agustin Suarez Merino's work as a Software Engineer & Entrepreneur.

## Features

- Responsive design
- Multi-language support (English and Spanish)
- Dark/light theme
- Sections for:
  - About
  - Projects
  - Articles
  - Contact

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Next Themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/agustincto/personal-portfolio.git
   cd personal-portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

## Build

To build the project for production:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## Project Structure

- `app/`: Main application code (Next.js App Router)
- `components/`: Reusable UI components
- `hooks/`: Custom React hooks
- `lib/`: Utility functions and shared logic
- `public/`: Static assets
- `styles/`: Global styles

## Localization

The site supports multiple languages using a simple dictionary approach. Language files are managed in the `lib/dictionary` directory.

## License

[MIT](LICENSE) 