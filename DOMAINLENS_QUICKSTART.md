# DomainLens - Quick Start Guide

## 🚀 One-Line Launch (Ralph Wiggum Loop)

```bash
# Install Claude Code plugin first (if not already)
/plugin install ralph-wiggum@claude-plugins-official

# Then run with Ralph loop
/ralph-loop "Read DOMAINLENS_PROMPT.md and build the complete project following all phases. Test after each phase. Commit after each meaningful change using conventional commits." --max-iterations 100 --completion-promise "DOMAINLENS_COMPLETE"
```

---

## 🎯 Manual Phase-by-Phase (Safer)

If you prefer more control:

```bash
# Phase 1: Setup
claude "Read DOMAINLENS_PROMPT.md Phase 1. Initialize the Next.js project with all configurations. Test that it runs. Commit each step."

# Phase 2: UI Components  
claude "Continue with Phase 2. Build all UI components with tests. Commit each component."

# Phase 3-12: Continue...
claude "Continue with Phase 3..." 
# etc.
```

---

## 📋 Pre-Flight Checklist

Before running, ensure you have:

```bash
# Required
node >= 18.0.0
pnpm >= 8.0.0

# API Keys (add to .env.local)
YUTORI_API_KEY=your_key
TINYFISH_API_KEY=your_key
FREEPIK_API_KEY=your_key
TONIC_API_KEY=your_key
# Note: For hackathon demo, mock data is used - keys optional
```

---

## 🔧 Troubleshooting

### Loop gets stuck
```bash
/cancel-ralph
# Then manually continue from last successful phase
```

### Tests failing repeatedly
```bash
# Add to your prompt:
"Focus only on fixing the failing test. Do not change other code. Run the specific test after fixing."
```

### Build errors
```bash
# Add to your prompt:
"Run pnpm build. Fix any TypeScript or build errors one at a time. Commit each fix."
```

---

## 📊 Expected Timeline

| Phase | Est. Time | Cumulative |
|-------|-----------|------------|
| 1. Setup | 5 min | 5 min |
| 2. UI Components | 15 min | 20 min |
| 3. Hero Section | 5 min | 25 min |
| 4. Pipeline Viz | 10 min | 35 min |
| 5. API Routes | 10 min | 45 min |
| 6. Knowledge Cards | 10 min | 55 min |
| 7. Visual Cards | 15 min | 70 min |
| 8. Data Table | 5 min | 75 min |
| 9. Chat Interface | 10 min | 85 min |
| 10. Orchestration | 15 min | 100 min |
| 11. Integration | 10 min | 110 min |
| 12. Polish | 10 min | 120 min |

**Total: ~2 hours** (with Ralph loop running autonomously)

---

## ✅ Verification Commands

```bash
# After completion, verify everything:
pnpm test              # Should pass with >80% coverage
pnpm test:e2e          # Should pass all E2E tests
pnpm build             # Should succeed without warnings
pnpm dev               # Should run and demo should work
```

---

## 🎬 Demo Script

Once built, demo flow:

1. Open `http://localhost:3000`
2. Input is pre-filled: "Build an AI agent for steel metallurgy defect analysis"
3. Click **Generate Agent**
4. Watch pipeline animate through 5 steps (~15 seconds each)
5. Knowledge cards appear with extracted data
6. Visual cards reveal microscope images
7. Data table populates with defect records
8. Chat shows PASCC diagnosis conversation
9. Timer shows total elapsed time

**Pitch**: "From zero domain knowledge to working expert agent in under 5 minutes."
