# Shopify App Template with Turborepo

A Shopify app template using Turborepo, with Frontend built in Remix and Backend in Hono.

## System Requirements

- Node.js: >=18.20 or >=20.10 or >=21.0.0
- Package Manager: pnpm >=9.14.2

## Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

## Development

To run the entire application in development mode:

```bash
pnpm dev
```

To run services individually:

```bash
# Run client only
pnpm dev:client

# Run server only
pnpm dev:server
```

## Client (Frontend)

- Framework: Remix
- UI Components: Shopify Polaris
- Styling: Tailwind CSS
- Type checking: TypeScript
- Code formatting: Biome

### Key Features of Client
- Integrated with Shopify App Bridge
- Shopify authentication support
- tRPC integration for server communication
- Routing through Remix
- Built-in Tailwind CSS support
- TypeScript support

## Server (Backend)

- Framework: Hono
- API: tRPC
- Type checking: TypeScript
- Database: NULL

### Key Features of Server
- REST API endpoints
- tRPC router for type-safe API
- Database integration with Prisma
- Authentication and session management
- TypeScript support

### Server Dependencies
- Hono for web server
- tRPC for API
- Prisma for database operations
- TypeScript for type safety

## Environment Setup

Create `.env` files in both client and server root directories:

### Client (.env)
```bash
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
VITE_BACKEND_URL=your_backend_url
```
### Server (.env)
```bash
NULL
```

## Available Scripts

```bash
# Development
pnpm dev              # Run entire application with turbo
pnpm dev:client       # Run client
pnpm dev:server       # Run server

# Build
pnpm build           # Build entire application with turbo
pnpm build:client    # Build client
pnpm build:server    # Build server

# Production
pnpm start:client    # Run client in production
pnpm start:server    # Run server in production
```

## Development Guidelines
### Client
1. Folder Structure
```
app/
├── lib                  # utils function or config 
│   ├── const.ts  
│   └── trpc-client.ts   # trpc client config
├── routes               # docs: https://remix.run/docs/en/main/file-conventions/routes/
│   └── [route-folder]/
│       ├── route.ts     # page view
│       └── _components  # page components
├── hooks                # useful hooks
├── components/
│   ├── ui               # smallest component, e.g: Button, or shadcn/ui...
│   ├── shared           # reuseable components
│   └── ...
├── api                  # api call
└── services             # tanstack-query (if necessary)
extensions/              # shopify app extension
```
2. Naming convention
   - Avoid use any for type safety
   - Use `kebab-case` for filename
   - Follow the React Naming convention like `useHook`, `ComponentName`

3. **Code Style**
   - Use Biome for code formatting
   - Follow existing code patterns
   - Write meaningful comments
   - Always format code with Biome

4. **API Development**
   - Use tRPC for type-safe API endpoints
   - Follow RESTful principles
   - Document new endpoints
