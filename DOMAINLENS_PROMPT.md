# DOMAINLENS - Claude Code Build Prompt

> **Mission**: Build an autonomous AI agent generator that takes zero domain knowledge and produces a working, expert-level AI agent in under 5 minutes.

## 🎯 PROJECT OVERVIEW

**DomainLens** transforms a simple text prompt into a fully functional AI agent with deep domain expertise by orchestrating 5 sponsor tools:

1. **Yutori** - Deep web research on the domain
2. **TinyFish (AgentQL)** - Structured data extraction
3. **Freepik** - AI-generated domain visualizations
4. **Tonic Fabricate** - Synthetic training data generation
5. **Cline** - Code generation for the final agent

**Demo Use Case**: Steel metallurgy defect analysis
- Input: "Build an AI agent for steel metallurgy defect analysis"
- Output: Working chat agent that can diagnose PASCC, sensitization, SCC, etc.

---

## 🛠️ TECH STACK

```
Frontend:     Next.js 14 (App Router) + TypeScript
Styling:      Tailwind CSS + Framer Motion
State:        Zustand
API Layer:    Next.js API Routes
Testing:      Vitest + React Testing Library + Playwright
Package Mgr:  pnpm
```

---

## 📁 PROJECT STRUCTURE

```
domainlens/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Main demo page
│   │   ├── layout.tsx               # Root layout
│   │   ├── globals.css              # Global styles
│   │   └── api/
│   │       ├── research/route.ts    # Yutori integration
│   │       ├── extract/route.ts     # TinyFish integration
│   │       ├── visualize/route.ts   # Freepik integration
│   │       ├── synthesize/route.ts  # Tonic integration
│   │       └── generate/route.ts    # Cline integration
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Spinner.tsx
│   │   ├── Pipeline/
│   │   │   ├── PipelineSteps.tsx    # 5-step progress indicator
│   │   │   └── StepIcon.tsx
│   │   ├── Knowledge/
│   │   │   ├── KnowledgeCard.tsx    # Domain knowledge display
│   │   │   ├── DataGrid.tsx         # Extracted parameters
│   │   │   └── SourceList.tsx       # Source references
│   │   ├── Visuals/
│   │   │   ├── VisualCard.tsx       # AI-generated image card
│   │   │   ├── ImageLoader.tsx      # Loading state
│   │   │   └── PromptDisplay.tsx    # Freepik prompt showcase
│   │   ├── Data/
│   │   │   ├── DataTable.tsx        # Synthetic data display
│   │   │   └── DataRow.tsx
│   │   ├── Chat/
│   │   │   ├── ChatInterface.tsx    # Final agent chat UI
│   │   │   ├── Message.tsx
│   │   │   └── ChatInput.tsx
│   │   └── Hero/
│   │       ├── HeroSection.tsx
│   │       └── DomainInput.tsx
│   ├── hooks/
│   │   ├── usePipeline.ts           # Pipeline orchestration
│   │   ├── useTimer.ts              # Elapsed time tracking
│   │   └── useChat.ts               # Chat state management
│   ├── stores/
│   │   └── pipelineStore.ts         # Zustand store
│   ├── lib/
│   │   ├── api/
│   │   │   ├── yutori.ts            # Yutori API client
│   │   │   ├── tinyfish.ts          # TinyFish API client
│   │   │   ├── freepik.ts           # Freepik API client
│   │   │   ├── tonic.ts             # Tonic API client
│   │   │   └── cline.ts             # Cline API client
│   │   ├── types.ts                 # TypeScript interfaces
│   │   └── constants.ts             # App constants
│   └── data/
│       └── mockData.ts              # Demo/fallback data
├── tests/
│   ├── unit/
│   │   ├── components/
│   │   └── hooks/
│   ├── integration/
│   │   └── api/
│   └── e2e/
│       └── pipeline.spec.ts
├── public/
│   └── fonts/
├── .env.example
├── tailwind.config.ts
├── vitest.config.ts
├── playwright.config.ts
└── package.json
```

---

## 🎨 VISUAL DESIGN REQUIREMENTS

### Color Palette
```css
/* Background */
--bg-primary: #0a0a0b;
--bg-secondary: #111113;
--bg-card: #18181b;
--bg-elevated: #1f1f23;

/* Borders */
--border: #27272a;
--border-light: #3f3f46;

/* Text */
--text-primary: #fafafa;
--text-secondary: #a1a1aa;
--text-muted: #71717a;

/* Accents */
--accent-orange: #f97316;   /* Yutori */
--accent-blue: #3b82f6;     /* TinyFish */
--accent-purple: #a855f7;   /* Freepik */
--accent-green: #22c55e;    /* Tonic */
--accent-cyan: #06b6d4;     /* Cline */
--accent-red: #ef4444;      /* Errors/Defects */
```

### Typography
```css
/* Headings */
font-family: 'Space Grotesk', sans-serif;

/* Body */
font-family: 'Outfit', sans-serif;

/* Code/Data */
font-family: 'JetBrains Mono', monospace;
```

### Visual Effects
- Animated grid background (subtle, 0.03 opacity orange lines)
- Gradient glows (orange top-right, blue bottom-left)
- Smooth transitions (0.3s-0.5s ease)
- Staggered animations for cards (150ms delay between each)
- Loading spinners with brand colors
- Hover states with subtle lift (translateY -4px) and glow

### Component Styling
- Cards: rounded-2xl, subtle border, hover border color change
- Buttons: gradient backgrounds, hover lift + shadow
- Inputs: dark background, focus ring with accent color
- Badges: small, rounded-full, color-coded by tool

---

## ✅ TESTING REQUIREMENTS

### Unit Tests (Vitest)
Every component and hook must have tests covering:
- Rendering without errors
- Props handling
- User interactions
- State changes
- Edge cases

```typescript
// Example: tests/unit/components/PipelineSteps.test.tsx
import { render, screen } from '@testing-library/react'
import { PipelineSteps } from '@/components/Pipeline/PipelineSteps'

describe('PipelineSteps', () => {
  it('renders all 5 steps', () => {
    render(<PipelineSteps currentStep={0} />)
    expect(screen.getByText('Yutori')).toBeInTheDocument()
    expect(screen.getByText('TinyFish')).toBeInTheDocument()
    expect(screen.getByText('Freepik')).toBeInTheDocument()
    expect(screen.getByText('Tonic')).toBeInTheDocument()
    expect(screen.getByText('Cline')).toBeInTheDocument()
  })

  it('marks completed steps correctly', () => {
    render(<PipelineSteps currentStep={3} />)
    // Steps 1-2 should be completed, step 3 active, steps 4-5 waiting
  })
})
```

### Integration Tests
- API route handlers
- Pipeline orchestration flow
- State management

### E2E Tests (Playwright)
```typescript
// tests/e2e/pipeline.spec.ts
import { test, expect } from '@playwright/test'

test('full pipeline execution', async ({ page }) => {
  await page.goto('/')
  
  // Enter domain
  await page.fill('input[placeholder*="Describe"]', 'steel metallurgy')
  await page.click('button:has-text("Generate")')
  
  // Wait for pipeline completion
  await expect(page.locator('[data-step="1"]')).toHaveClass(/completed/, { timeout: 30000 })
  await expect(page.locator('[data-step="5"]')).toHaveClass(/completed/, { timeout: 120000 })
  
  // Verify outputs
  await expect(page.locator('.knowledge-card')).toHaveCount(4)
  await expect(page.locator('.visual-card')).toHaveCount(6)
  await expect(page.locator('.chat-section')).toBeVisible()
})
```

### Test Coverage Target
- Minimum 80% coverage for components
- 100% coverage for utility functions
- All API routes must have integration tests

---

## 📝 GIT COMMIT CONVENTION

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code change)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(pipeline): add PipelineSteps component with progress indicator

- Implement 5-step progress bar
- Add active/completed/waiting states
- Include animated transitions

feat(api): implement Yutori research endpoint

- Add POST /api/research route
- Integrate Yutori API client
- Return structured research results
- Add error handling

test(pipeline): add unit tests for PipelineSteps

- Test step rendering
- Test state transitions
- Test accessibility
- Achieve 95% coverage

fix(visuals): correct image loading animation timing

style(ui): improve Card component hover states

chore: update dependencies to latest versions
```

### Commit Frequency
- Commit after each meaningful change
- Each commit should be atomic and pass all tests
- Never commit broken code

---

## 🚀 BUILD PHASES

### Phase 1: Project Setup
```bash
# Tasks:
- Initialize Next.js 14 project with TypeScript
- Configure Tailwind CSS with custom theme
- Set up fonts (Space Grotesk, Outfit, JetBrains Mono)
- Configure Vitest and React Testing Library
- Configure Playwright
- Create base layout with gradient background
- Set up Zustand store skeleton

# Commits:
feat: initialize Next.js 14 project with TypeScript
feat(styles): configure Tailwind with custom theme
feat(fonts): add Space Grotesk, Outfit, JetBrains Mono
test: configure Vitest and React Testing Library
test: configure Playwright for E2E testing
feat(layout): create root layout with gradient background
feat(store): initialize Zustand pipeline store

# Tests:
- Verify app renders without errors
- Verify fonts load correctly
- Verify Tailwind classes apply
```

### Phase 2: UI Components
```bash
# Tasks:
- Build reusable UI components (Button, Card, Input, Badge, Spinner)
- Each component must have:
  - TypeScript props interface
  - Tailwind styling with variants
  - Unit tests
  - Storybook-ready (optional)

# Commits:
feat(ui): add Button component with variants
test(ui): add Button component tests
feat(ui): add Card component with hover effects
test(ui): add Card component tests
feat(ui): add Input component with focus states
test(ui): add Input component tests
feat(ui): add Badge component for tool indicators
test(ui): add Badge component tests
feat(ui): add Spinner component with brand colors
test(ui): add Spinner component tests

# Tests per component:
- Renders correctly
- Applies variant styles
- Handles click/change events
- Accessible (aria labels, keyboard nav)
```

### Phase 3: Hero & Input Section
```bash
# Tasks:
- Build HeroSection with animated badge
- Build DomainInput with styled input + generate button
- Connect to Zustand store
- Add input validation

# Commits:
feat(hero): add HeroSection with animated badge
feat(hero): add DomainInput component
feat(hero): connect input to pipeline store
test(hero): add HeroSection tests
test(hero): add DomainInput tests

# Tests:
- Hero renders with correct text
- Input accepts and stores value
- Generate button triggers pipeline
- Validation prevents empty submissions
```

### Phase 4: Pipeline Visualization
```bash
# Tasks:
- Build PipelineSteps component (5 steps with icons)
- Implement progress bar animation
- Add step states (waiting, active, completed)
- Connect to store for real-time updates

# Commits:
feat(pipeline): add PipelineSteps component
feat(pipeline): add StepIcon component with tool icons
feat(pipeline): implement progress bar animation
feat(pipeline): connect to store for state updates
test(pipeline): add comprehensive tests

# Tests:
- All 5 steps render
- Correct step is active based on store
- Completed steps show checkmark
- Progress bar width matches current step
```

### Phase 5: API Routes (Mock First)
```bash
# Tasks:
- Create API route structure
- Implement mock responses for demo mode
- Add proper TypeScript types for responses
- Add error handling

# Commits:
feat(api): add research route with mock Yutori response
feat(api): add extract route with mock TinyFish response
feat(api): add visualize route with mock Freepik response
feat(api): add synthesize route with mock Tonic response
feat(api): add generate route with mock Cline response
feat(types): add TypeScript interfaces for all API responses
test(api): add integration tests for all routes

# Tests:
- Each route returns expected structure
- Error handling works correctly
- TypeScript types match responses
```

### Phase 6: Knowledge Cards
```bash
# Tasks:
- Build KnowledgeCard component
- Build DataGrid for extracted parameters
- Build SourceList for references
- Implement staggered reveal animation

# Commits:
feat(knowledge): add KnowledgeCard component
feat(knowledge): add DataGrid component
feat(knowledge): add SourceList component
feat(knowledge): implement staggered animations
test(knowledge): add component tests

# Tests:
- Cards render with correct data
- DataGrid displays key-value pairs
- Sources are clickable
- Animations trigger in sequence
```

### Phase 7: Visual Cards (Freepik Showcase)
```bash
# Tasks:
- Build VisualCard component with image container
- Build ImageLoader with spinner
- Build PromptDisplay to show Freepik prompts
- Create CSS-based microscope visualizations (fallback)
- Implement reveal animations

# Commits:
feat(visuals): add VisualCard component
feat(visuals): add ImageLoader with branded spinner
feat(visuals): add PromptDisplay component
feat(visuals): add CSS microscope visualizations
feat(visuals): implement loading → reveal animation
test(visuals): add component tests

# Tests:
- Cards render with image placeholders
- Loading state shows spinner
- Prompt text displays correctly
- Animation sequence works
```

### Phase 8: Data Table
```bash
# Tasks:
- Build DataTable component
- Build DataRow with severity coloring
- Implement row reveal animation
- Add responsive scrolling

# Commits:
feat(data): add DataTable component
feat(data): add DataRow with severity colors
feat(data): implement row animations
test(data): add component tests

# Tests:
- Table renders with headers
- Rows display correct data
- Severity colors apply correctly
- Responsive on mobile
```

### Phase 9: Chat Interface
```bash
# Tasks:
- Build ChatInterface container
- Build Message component (user/agent variants)
- Build ChatInput
- Implement message animations
- Add mock conversation for demo

# Commits:
feat(chat): add ChatInterface component
feat(chat): add Message component
feat(chat): add ChatInput component
feat(chat): implement message animations
feat(chat): add mock PASCC conversation
test(chat): add component tests

# Tests:
- Chat renders with header
- Messages display correctly
- User/agent styles differ
- Input handles submissions
```

### Phase 10: Pipeline Orchestration
```bash
# Tasks:
- Implement usePipeline hook
- Orchestrate API calls in sequence
- Update store at each step
- Handle errors gracefully
- Add timer tracking

# Commits:
feat(hooks): add usePipeline orchestration hook
feat(hooks): add useTimer hook
feat(pipeline): integrate with all API routes
feat(pipeline): add error handling and retry logic
test(hooks): add usePipeline tests
test(hooks): add useTimer tests

# Tests:
- Pipeline progresses through all steps
- Store updates correctly at each step
- Errors are caught and displayed
- Timer tracks elapsed time
```

### Phase 11: Full Integration
```bash
# Tasks:
- Connect all components on main page
- Verify full flow works end-to-end
- Add timer badge (fixed position)
- Polish transitions and timing

# Commits:
feat(page): integrate all components on main page
feat(page): add timer badge component
fix(animations): adjust timing for smooth flow
test(e2e): add full pipeline E2E test

# Tests:
- E2E test passes completely
- All sections appear in correct order
- Timer displays accurate time
- No console errors
```

### Phase 12: Polish & Optimization
```bash
# Tasks:
- Performance optimization (lazy loading, memoization)
- Accessibility audit (ARIA, keyboard nav, contrast)
- Mobile responsiveness
- Final visual polish
- README documentation

# Commits:
perf: add lazy loading for heavy components
perf: memoize expensive computations
fix(a11y): add ARIA labels and keyboard navigation
fix(responsive): improve mobile layout
style: final visual polish and micro-interactions
docs: add comprehensive README

# Tests:
- Lighthouse score > 90
- All accessibility tests pass
- Mobile viewport tests pass
```

---

## 🏁 COMPLETION CRITERIA

The project is COMPLETE when:

1. ✅ `pnpm dev` runs without errors
2. ✅ `pnpm test` passes with >80% coverage
3. ✅ `pnpm test:e2e` passes all Playwright tests
4. ✅ `pnpm build` succeeds without warnings
5. ✅ Full demo flow works:
   - Enter domain → Click Generate
   - Pipeline animates through 5 steps
   - Knowledge cards appear with staggered animation
   - Visual cards appear with loading → reveal
   - Data table populates with rows
   - Chat interface shows conversation
   - Timer displays total elapsed time
6. ✅ All commits follow conventional commit format
7. ✅ Code is properly typed (no `any` types)
8. ✅ No console errors or warnings
9. ✅ Responsive on mobile (375px+)
10. ✅ README documents setup and usage

---

## 🔄 ITERATION INSTRUCTIONS

If tests fail:
1. Read the error message carefully
2. Fix the specific issue
3. Run tests again
4. Commit the fix with `fix(scope): description`

If build fails:
1. Check TypeScript errors
2. Fix type issues
3. Run `pnpm build` again
4. Commit with `fix(types): description`

If visual issues:
1. Check browser console
2. Verify Tailwind classes
3. Test responsive breakpoints
4. Commit with `style(scope): description`

---

## 📤 OUTPUT

When complete, output:
```
<promise>DOMAINLENS_COMPLETE</promise>
```

Do NOT output this until ALL completion criteria are met.
