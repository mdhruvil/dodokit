# Agent Guidelines for dodokit

## IMP Instructions

- always refer to context7 for latest docs
- don't build project to test, instead use `lint` command

## Commands

- **Dev**: `bun dev` (runs with Turbopack)
- **Build**: `bun build` (with Turbopack)
- **Lint**: `bun lint` (ESLint with Next.js config)
- **Format**: `bun format` (Prettier with Tailwind plugin)
- **Type Check**: `bunx tsc --noEmit`

## Code Style

- **Imports**: Use `@/` alias for src imports, group external first then internal
- **Types**: Use TypeScript strict mode, explicit return types for functions
- **Components**: Use function declarations, destructure props with `...props` spread
- **Error Handling**: Use `error instanceof Error ? error.message : "An error occurred"`
- **State**: Use proper TypeScript types (e.g., `string | null`, `"email" | "otp"`)
- **Naming**: camelCase for variables/functions, PascalCase for components, UPPER_SNAKE_CASE for constants, kebab-case for files
- **Async**: Use try/catch with proper loading states and error handling
- **UI**: Use Radix UI + Tailwind, shadcn/ui patterns with `cn()` utility
- **Forms**: Controlled components with proper validation and loading states
- **Client Components**: Use `"use client"` directive when needed for interactivity

## Architecture

- Next.js 15 App Router with Supabase auth
- Component library: Radix UI + Tailwind CSS + class-variance-authority
- State management: React hooks (useState, useRouter)
- Path aliases: `@/*` maps to `./src/*`
