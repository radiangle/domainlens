# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DomainLens is an AI agent generator that transforms a simple domain description into a working, expert-level AI agent in under 5 minutes. It orchestrates a 5-stage pipeline:

1. **Research** (Yutori) - Deep web research on the domain
2. **Extract** (TinyFish/AgentQL) - Structured data extraction
3. **Visualize** (Freepik) - AI-generated domain imagery
4. **Synthesize** (Tonic Fabricate) - Synthetic training data generation
5. **Generate** (Cline) - Final agent code generation

Demo use case: Steel metallurgy defect analysis - input a domain description, output a chat agent that can diagnose PASCC, sensitization, SCC, etc.

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **State**: Zustand
- **Testing**: Vitest + React Testing Library + Playwright
- **Package Manager**: pnpm

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm test         # Run unit tests (Vitest)
pnpm test:e2e     # Run E2E tests (Playwright)
pnpm lint         # Run linter
```

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main demo page
│   ├── layout.tsx         # Root layout with gradient background
│   └── api/               # API route handlers for each pipeline stage
│       ├── research/      # Yutori integration
│       ├── extract/       # TinyFish integration
│       ├── visualize/     # Freepik integration
│       ├── synthesize/    # Tonic integration
│       └── generate/      # Cline integration
├── components/
│   ├── ui/                # Reusable primitives (Button, Card, Input, Badge, Spinner)
│   ├── Pipeline/          # 5-step progress visualization
│   ├── Knowledge/         # Domain knowledge display cards
│   ├── Visuals/           # AI-generated image cards
│   ├── Data/              # Synthetic data table
│   ├── Chat/              # Final agent chat interface
│   └── Hero/              # Hero section with domain input
├── hooks/
│   ├── usePipeline.ts     # Orchestrates API calls in sequence
│   ├── useTimer.ts        # Elapsed time tracking
│   └── useChat.ts         # Chat state management
├── stores/
│   └── pipelineStore.ts   # Zustand store for pipeline state
├── lib/
│   ├── api/               # API clients for each pipeline stage
│   └── types.ts           # TypeScript interfaces
└── data/
    └── mockData.ts        # Demo/fallback data
```

### Pipeline Flow

1. User enters domain description in Hero section
2. `usePipeline` hook orchestrates sequential API calls through all 5 stages
3. Each stage updates Zustand store, triggering UI updates
4. Pipeline visualization shows progress through each stage
5. Results populate Knowledge cards, Visual cards, Data table, and Chat interface

### API Routes

All routes use mock data for demo mode. Each returns structured TypeScript-typed responses:
- `POST /api/research` - Deep web research via Yutori
- `POST /api/extract` - Structured extraction via TinyFish
- `POST /api/visualize` - AI image generation via Freepik
- `POST /api/synthesize` - Synthetic data via Tonic
- `POST /api/generate` - Code generation via Cline

## Design System

### Colors (Dark Mode)

Each pipeline stage has an accent color:
- Research: orange (#f97316)
- Extract: blue (#3b82f6)
- Visualize: purple (#a855f7)
- Synthesize: green (#22c55e)
- Generate: cyan (#06b6d4)

Background: #0a0a0b (primary), #111113 (secondary), #18181b (card)

### Typography

- Headings: Space Grotesk
- Body: Outfit
- Code/Data: JetBrains Mono

### Animations

- Staggered card reveals (150ms delay between each)
- Smooth transitions (0.3s-0.5s ease)
- Loading spinners with stage colors
- Hover states with subtle lift (translateY -4px)

## Testing Requirements

- Minimum 80% coverage for components
- 100% coverage for utility functions
- All API routes must have integration tests
- E2E tests for complete pipeline flow

## Git Commit Convention

Follow Conventional Commits:
```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
```

## Build Specification

Detailed 12-phase build plan is in `DOMAINLENS_PROMPT.md`. Quick start instructions in `DOMAINLENS_QUICKSTART.md`.
