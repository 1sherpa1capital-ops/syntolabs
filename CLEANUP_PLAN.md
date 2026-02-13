# Codebase Cleanup Plan

## Executive Summary

Analysis of the Synto Labs codebase identified **redundancies, misalignments, and technical debt** across documentation, dependencies, code, and configuration. This plan prioritizes issues by severity and provides actionable steps.

---

## Critical Issues (Fix Immediately)

### 1. Duplicate `getCalLink` Functions ❌
**Location**: 
- `landingpage/src/components/cal-provider.tsx` (line 31)
- `landingpage/src/components/inline-booking-button.tsx` (line 65)

**Problem**: Two functions with identical logic for building Cal.com links. Violates DRY principle.

**Solution**: 
```typescript
// Export from cal-provider.tsx and import in inline-booking-button.tsx
// Remove local getCalLink from inline-booking-button.tsx
```

### 2. React Version Mismatch ⚠️
**Landingpage**: `react: "19.2.3"` (exact)
**Mypage**: `react: "^19.0.0"` (caret range)

**Problem**: Could result in different React versions, causing hook/context compatibility issues.

**Solution**: Align both to exact version:
```json
"react": "19.2.3",
"react-dom": "19.2.3"
```

### 3. Lucide-React Version Mismatch ⚠️
**Landingpage**: `^0.563.0`
**Mypage**: `^0.469.0`

**Problem**: 20% version difference - potential icon inconsistencies or missing icons.

**Solution**: Upgrade mypage to `^0.563.0`.

### 4. Nested `landingpage/` Directory ❌
**Location**: `/home/user/dev/syntolabs/landingpage/landingpage/`

**Problem**: Erroneous double-nested directory with duplicate/partial files:
- `src/components/booking-toasts.tsx` (462 bytes - partial copy)
- `src/context/` (empty)

**Solution**: Delete entire nested directory.

---

## High Priority Issues

### 5. Duplicate Documentation (5 Pairs)
Root-level files have different content than subdirectory versions:

| Root File | Subdirectory File | Action |
|-----------|------------------|---------|
| `/doc/brand-guidelines.md` (446 lines, v1.1) | `/doc/marketing/brand-guidelines.md` (165 lines, v2.0) | **Keep subdirectory v2.0**, delete root |
| `/doc/contractor-guidelines.md` (305 lines) | `/doc/operations/contractor-guidelines.md` (388 lines) | **Keep subdirectory**, delete root |
| `/doc/delivery-playbook.md` (720 lines) | `/doc/operations/delivery-playbook.md` (122 lines) | **Keep root** (comprehensive), delete sub |
| `/doc/security-protocol.md` (739 lines, v1.0) | `/doc/technical/security-protocol.md` (133 lines, v2.0) | **Keep subdirectory v2.0**, delete root |
| `/doc/system-architecture.md` (866 lines, v1.0) | `/doc/technical/system-architecture.md` (207 lines, v2.0) | **Keep subdirectory v2.0**, delete root |

**Note**: Update `/doc/contents.md` after cleanup to remove "Duplicate/Symlink" references.

### 6. Outdated CLAUDE.md
**Problem**: Lists "Vite 6" as build tool but landingpage uses Next.js 16. Mentions "React Router v7" but uses Next.js App Router.

**Solution**: Update tech stack section to reflect actual architecture.

### 7. Unused Dependencies
**Landingpage**:
- `three` - Not imported anywhere
- `@types/three` - Depends on three
- `dotenv` - Only used in scripts/, should be devDependency

**Action**:
```bash
cd landingpage
bun remove three @types/three
bun remove dotenv && bun add -d dotenv
```

### 8. Environment Variable Chaos
**CAL_API_KEY** appears in 3 locations:
1. Root `.env`
2. `landingpage/.env.local`
3. Implied in Vercel

**VERCEL_OIDC_TOKEN**: Root `.env.local` has different token than landingpage `.env.local`.

**Solution**: 
- Keep shared vars in root `.env`
- Keep project-specific vars in project `.env.local`
- Document all required vars in `.env.example`

---

## Medium Priority Issues

### 9. Missing ESLint in Mypage
**Problem**: No linting configuration for mypage project.

**Solution**: Create `mypage/eslint.config.mjs` with Vite/React rules.

### 10. Missing Prettier (Both Projects)
**Problem**: No code formatting standard.

**Solution**: 
- Add `.prettierrc` to both projects
- Add `format` scripts to package.json

### 11. TypeScript Configuration Drift

| Setting | Landingpage | Mypage | Recommendation |
|---------|-------------|--------|----------------|
| Target | ES2017 | ES2020 | Align to ES2020 |
| Strict | Basic | Extended | Add missing strict options to landingpage |

**Landingpage missing**:
```json
"noUnusedLocals": true,
"noUnusedParameters": true,
"noFallthroughCasesInSwitch": true
```

### 12. Empty Directories (12 Found)
```
/data
/landingpage/landingpage/ (duplicate - see #4)
/mypage/src/lib
/mypage/src/hooks
/.loki/state
/.loki/memory/episodic
/.loki/memory/semantic
/.loki/metrics/efficiency
```

**Solution**: Remove empty directories or add `.gitkeep` with purpose documentation.

### 13. Root package.json
**Problem**: Contains only unused `lucide-react` dependency.

**Solution**: Either:
- Delete entirely, OR
- Convert to proper workspace configuration:
```json
{
  "name": "@syntolabs/monorepo",
  "private": true,
  "workspaces": ["landingpage", "mypage"]
}
```

---

## Low Priority Issues

### 14. Misplaced Planning Files
Root-level task files should be in `/doc/operations/projects/`:
- `task_plan.md` → `doc/operations/projects/agentmail-task-plan.md`
- `findings.md` → `doc/operations/projects/agentmail-findings.md`
- `progress.md` → `doc/operations/projects/agentmail-progress.md`
- `cal_deploy_plan.md` → `doc/operations/projects/calcom-deploy-plan.md`
- `AGENTMAIL_SETUP.md` → `doc/technical/agentmail-setup-guide.md`

### 15. Generic README in Landingpage
**Problem**: `landingpage/README.md` contains create-next-app boilerplate.

**Solution**: Replace with project-specific documentation.

### 16. Outdated SPEC.md
**Problem**: Design spec describes "Anti-AI Slop" philosophy with Matrix Green colors that don't match current Green Tea theme.

**Solution**: Update or archive if design has changed.

### 17. PostCSS Config Naming
**Landingpage**: `postcss.config.mjs`
**Mypage**: `postcss.config.js`

**Solution**: Use consistent naming (both `.mjs` or both `.js`).

### 18. .gitignore Improvements
- Add `.env` (if contains secrets)
- Add OS files (`.DS_Store`)
- Add IDE files (`.vscode/`, `.idea/`)
- Remove duplicate `.env*.local` entry in landingpage

### 19. Components Index Incomplete
**File**: `landingpage/src/components/index.ts`

Only exports 7 components but there are 15+ component files. Either:
- Add all component exports, OR
- Remove index.ts if not used

### 20. Mysterious File
**File**: `/mypage/1.syntolabs`

Empty/random file - should be deleted.

---

## Quick Wins (5 minutes each)

1. ✅ Delete nested `landingpage/landingpage/` directory
2. ✅ Delete `/mypage/1.syntolabs` file
3. ✅ Remove `three` and `@types/three` dependencies
4. ✅ Fix root `package.json` (delete or add workspaces)
5. ✅ Update landingpage `README.md` with project info
6. ✅ Remove duplicate `.env*.local` from landingpage `.gitignore`

---

## Implementation Order

### Phase 1: Critical (Day 1)
- [ ] Fix duplicate `getCalLink` functions
- [ ] Align React versions
- [ ] Align lucide-react versions
- [ ] Delete nested landingpage directory

### Phase 2: High Priority (Day 2-3)
- [ ] Consolidate duplicate documentation
- [ ] Remove unused dependencies
- [ ] Clean up environment variables
- [ ] Update CLAUDE.md tech stack

### Phase 3: Medium Priority (Week 1)
- [ ] Add ESLint to mypage
- [ ] Add Prettier to both projects
- [ ] Align TypeScript configs
- [ ] Remove empty directories
- [ ] Fix root package.json

### Phase 4: Low Priority (Ongoing)
- [ ] Reorganize planning files
- [ ] Update README and SPEC
- [ ] Standardize config file naming
- [ ] Improve .gitignore files

---

## Before/After Statistics

| Metric | Before | After (Goal) |
|--------|--------|--------------|
| Duplicate docs | 5 pairs | 0 |
| Empty directories | 12 | 0-2 (documented) |
| Unused dependencies | 3 | 0 |
| Version mismatches | 4 | 0 |
| Missing configs | 2 | 0 |
| Total files | ~150 | ~130 (-13%) |

---

## Success Criteria

✅ All critical issues resolved
✅ No duplicate code in src/
✅ All tests pass
✅ Build succeeds for both projects
✅ No broken imports
✅ Environment variables documented
✅ Code style consistent across codebase
