# useReactHook

<div align="center">
  <img src="./public/react.png" alt="useReactHook" width="200" />
  <p><strong>Collection of React Hooks</strong></p>
  <p>Find and copy expertly crafted custom hooks with clear documentation, usage examples, and tips for optimization.</p>

  <p>
    <a href="https://usereacthook.com">Website</a> •
    <a href="https://github.com/project-kt/usereacthook">GitHub</a>
  </p>
</div>

---

## Overview

useReactHook is a comprehensive collection of custom React hooks designed to simplify common development patterns and enhance your React applications. Each hook comes with detailed documentation, practical examples, and usage statistics to help you make informed decisions.

## Features

- **Curated Hook Collection**: Expertly crafted custom React hooks for common use cases
- **Comprehensive Documentation**: Each hook includes detailed documentation with API references and examples
- **Usage Statistics**: Track hook popularity, copy counts, and community feedback
- **Search Functionality**: Quickly find the hooks you need with built-in search
- **Dark Mode**: Comfortable viewing experience with theme toggle
- **Responsive Design**: Fully responsive interface that works on all devices
- **Type-Safe**: Written in TypeScript for better developer experience
- **Copy to Clipboard**: One-click copying of hook implementations

## Available Hooks

### Event Handling
- **useClickOutside**: Trigger functions when clicks occur outside a specified element
- **useClickInside**: Detect clicks inside a specified element
- **useHoverOutside**: Handle hover events outside an element
- **useHoverInside**: Handle hover events inside an element

### Utilities
- **useCopyToClipboard**: Simplified clipboard operations with feedback
- **useHasMounted**: Check if a component has mounted (SSR-safe)
- **useKeyboardCommands**: Create keyboard shortcuts and command interfaces

## Tech Stack

### Frontend Framework
- **Next.js 14**: React framework with App Router
- **React 18**: Latest React features and optimizations
- **TypeScript**: Type-safe development

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **next-themes**: Dark mode support

### Database & ORM
- **Drizzle ORM**: Type-safe SQL ORM
- **MySQL**: Relational database for storing hook statistics

### Content Management
- **Velite**: Content processing for MDX files
- **MDX**: Enhanced markdown for documentation
- **rehype-pretty-code**: Beautiful code syntax highlighting
- **rehype-slug**: Auto-generated heading IDs
- **rehype-autolink-headings**: Clickable heading anchors

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **lint-staged**: Run linters on staged files

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm 10 or higher
- MySQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/project-kt/usereacthook.git
cd usereacthook
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure your database connection:
```env
DATABASE_URL="mysql://user:password@localhost:3306/database"
```

4. Push the database schema:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Database Setup

If you need to start a local MySQL database, you can use the provided script:
```bash
./start-database.sh
```

To view and manage your database:
```bash
npm run db:studio
```

## Project Structure

```
usereacthook/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── _components/       # Homepage components
│   │   ├── api/               # API routes for statistics
│   │   ├── contact/           # Contact page
│   │   └── docs/              # Documentation pages
│   ├── components/            # Reusable components
│   │   ├── hooks/            # Hook utilities
│   │   └── ui/               # UI components (Radix)
│   ├── config/               # Site configuration
│   ├── content/              # MDX documentation files
│   │   └── docs/            # Hook documentation
│   ├── lib/                  # Utility functions
│   └── server/               # Server-side code
│       └── db/              # Database schema and queries
├── public/                   # Static assets
└── velite.config.ts         # Content processing config
```

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

### Database
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Adding New Hooks

1. Create a new MDX file in `src/content/docs/`:
```mdx
---
title: useYourHook
description: Brief description of what the hook does
published: true
new: true  # Mark as new (optional)
---

## Overview
Detailed explanation of the hook...

## Code
\`\`\`tsx
// Your hook implementation
\`\`\`

## API
### Parameters
- param1: Description

## Examples
\`\`\`tsx
// Usage example
\`\`\`
```

2. The hook will automatically appear in the documentation and search index

## Statistics Tracking

The application tracks the following metrics for each hook:
- **Click Count**: Number of times the hook page is viewed
- **Copy Count**: Number of times the code is copied
- **Useful Count**: Community feedback on usefulness
- **Useless Count**: Community feedback on lack of usefulness

## Deployment

### Netlify (Recommended)

The project includes Netlify configuration and is optimized for deployment:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure environment variables in Netlify dashboard
4. Deploy

### Vercel

```bash
npm run build
```

Deploy to Vercel with the Next.js preset.

### Docker

Build and run with Docker:
```bash
docker build -t usereacthook .
docker run -p 3000:3000 usereacthook
```

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-hook`
3. Add your hook documentation in `src/content/docs/`
4. Ensure your code follows the linting rules: `npm run lint:fix`
5. Format your code: `npm run format`
6. Commit your changes: `git commit -m "Add useNewHook"`
7. Push to your fork: `git push origin feature/new-hook`
8. Open a Pull Request

### Contribution Guidelines

- Follow the existing hook documentation format
- Include comprehensive examples and API documentation
- Write TypeScript with proper type definitions
- Test your hooks thoroughly
- Ensure accessibility best practices

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

Built with the [T3 Stack](https://create.t3.gg/):
- [Next.js](https://nextjs.org)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)

UI Components from [Radix UI](https://www.radix-ui.com/)

## Support

- Visit [usereacthook.com](https://usereacthook.com)
- Open an issue on [GitHub](https://github.com/project-kt/usereacthook/issues)
- Reach out via the [Contact Page](https://usereacthook.com/contact)

---

<div align="center">
  Made with ❤️ by the useReactHook team
</div>
