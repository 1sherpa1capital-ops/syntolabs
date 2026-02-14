# Codebase Cleanup - Execution Plan

## Overview
Complete fix-all plan addressing 20 issues across documentation, code, dependencies, and configuration.

**Estimated Time**: 2-3 hours  
**Risk Level**: Low-Medium  
**Rollback Strategy**: Git commits after each phase

---

## Phase 1: Critical Fixes (30 minutes)
**Goal**: Fix breaking issues and security concerns

### 1.1 Delete Nested landingpage Directory
**Files**: `/home/user/dev/syntolabs/landingpage/landingpage/`
**Risk**: Low (duplicate/erroneous)
**Action**:
```bash
rm -rf /home/user/dev/syntolabs/landingpage/landingpage/
```

### 1.2 Fix Duplicate getCalLink Functions
**Files**:
- `/home/user/dev/syntolabs/landingpage/src/components/cal-provider.tsx` (keep)
- `/home/user/dev/syntolabs/landingpage/src/components/inline-booking-button.tsx` (remove local function)

**Action**:
1. Ensure `getCalLink` is exported from `cal-provider.tsx`
2. Import it in `inline-booking-button.tsx`
3. Remove local `getCalLink` function

**Code Changes**:
```typescript
// inline-booking-button.tsx - add import
import { getCalLink } from "./cal-provider";

// Remove local getCalLink function (lines 33-45)
// Replace with direct usage
const calLink = getCalLink(flow);
```

### 1.3 Delete Mysterious File
**File**: `/home/user/dev/syntolabs/mypage/1.syntolabs`
**Action**:
```bash
rm /home/user/dev/syntolabs/mypage/1.syntolabs
```

**Commit**: `git commit -m "fix: remove duplicate/erroneous files and functions"`

---

## Phase 2: Dependency Alignment (30 minutes)
**Goal**: Align versions, remove unused dependencies

### 2.1 Align React Versions
**Files**:
- `/home/user/dev/syntolabs/mypage/package.json`

**Change**:
```json
"react": "19.2.3",
"react-dom": "19.2.3"
```

### 2.2 Align Lucide-React Versions
**Files**:
- `/home/user/dev/syntolabs/mypage/package.json`

**Change**:
```json
"lucide-react": "^0.563.0"
```

### 2.3 Remove Unused Dependencies (landingpage)
```bash
cd /home/user/dev/syntolabs/landingpage
bun remove three @types/three
bun remove dotenv && bun add -d dotenv
```

### 2.4 Fix Root package.json
**Option A - Delete** (if not used):
```bash
rm /home/user/dev/syntolabs/package.json
```

**Option B - Convert to workspace** (if managing both projects):
```json
{
  "name": "@syntolabs/monorepo",
  "private": true,
  "workspaces": ["landingpage", "mypage"]
}
```

**Commit**: `git commit -m "fix: align dependencies and remove unused packages"`

---

## Phase 3: Documentation Cleanup (45 minutes)
**Goal**: Consolidate duplicates, update outdated docs

### 3.1 Consolidate Duplicate Documentation

**Delete these root-level files** (keep subdirectory versions):
```bash
rm /home/user/dev/syntolabs/doc/brand-guidelines.md
rm /home/user/dev/syntolabs/doc/contractor-guidelines.md
rm /home/user/dev/syntolabs/doc/security-protocol.md
rm /home/user/dev/syntolabs/doc/system-architecture.md
```

**Delete subdirectory file** (keep root version):
```bash
rm /home/user/dev/syntolabs/doc/operations/delivery-playbook.md
```

**Update contents.md**:
Remove references to "Duplicate/Symlink" entries.

### 3.2 Update CLAUDE.md Tech Stack
**File**: `/home/user/dev/syntolabs/CLAUDE.md`

**Changes**:
- Change "Build Tool: Vite 6" → "Build Tool: Next.js 16 (landingpage), Vite 6 (mypage)"
- Change "Routing: React Router v7" → "Routing: Next.js App Router (landingpage), React Router (mypage)"
- Add note about Cal.com integration

### 3.3 Rewrite Landingpage README.md
**File**: `/home/user/dev/syntolabs/landingpage/README.md`

Replace boilerplate with:
```markdown
# Synto Labs Landing Page

Synto Labs agency website built with Next.js 16 and Tailwind CSS v4.

## Development

```bash
cd landingpage
bun install
bun run dev
```

## Features
- Cal.com booking integration
- AgentMail contact forms
- Responsive design
- SEO optimized

## Deployment
```bash
vercel --prod
```
```

### 3.4 Archive or Update SPEC.md
**File**: `/home/user/dev/syntolabs/landingpage/SPEC.md`

**Option A - Update**: Rewrite with current Green Tea theme colors  
**Option B - Archive**: Rename to `SPEC-ARCHIVED.md`

**Commit**: `git commit -m "docs: consolidate documentation and update outdated files"`

---

## Phase 4: Configuration Fixes (45 minutes)
**Goal**: Align TypeScript, add missing configs, fix environment

### 4.1 Align TypeScript Configuration
**File**: `/home/user/dev/syntolabs/landingpage/tsconfig.json`

**Add missing strict options**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 4.2 Add ESLint to Mypage
**File**: `/home/user/dev/syntolabs/mypage/eslint.config.mjs`

```javascript
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default defineConfig({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  ignores: ["dist"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
});
```

**Add to mypage/package.json devDependencies**:
```json
{
  "@eslint/js": "^9",
  "eslint": "^9",
  "eslint-plugin-react-hooks": "^5",
  "eslint-plugin-react-refresh": "^0.4",
  "typescript-eslint": "^8"
}
```

### 4.3 Add Prettier to Both Projects

**Landingpage**: `/home/user/dev/syntolabs/landingpage/.prettierrc`
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Mypage**: `/home/user/dev/syntolabs/mypage/.prettierrc`
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Add to both package.json scripts**:
```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### 4.4 Fix .gitignore Files

**Root**: `/home/user/dev/syntolabs/.gitignore`
```gitignore
# Dependencies
node_modules/

# Build outputs
.next/
dist/
build/

# Environment files
.env
.env*.local

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
```

**Landingpage**: Remove duplicate `.env*.local` entry (line 42)

### 4.5 Clean Up Environment Variables

**Strategy**:
1. Keep shared vars in root `.env`:
   - MEM0_API_KEY
   - OPENROUTER_API_KEY
   - CAL_API_KEY (if used by both)

2. Keep project-specific in `.env.local`:
   - NEXT_PUBLIC_* vars (landingpage)
   - VITE_* vars (mypage)

3. Document in `.env.example` files

**Commit**: `git commit -m "config: align TypeScript, add ESLint/Prettier, fix gitignore"`

---

## Phase 5: Empty Directories & Misc (15 minutes)
**Goal**: Remove empty dirs, standardize naming

### 5.1 Remove Empty Directories
```bash
rm -rf /home/user/dev/syntolabs/data
rm -rf /home/user/dev/syntolabs/.loki/state
rm -rf /home/user/dev/syntolabs/.loki/memory/episodic
rm -rf /home/user/dev/syntolabs/.loki/memory/semantic
rm -rf /home/user/dev/syntolabs/.loki/metrics/efficiency
```

**Note**: Keep `/mypage/src/lib` and `/mypage/src/hooks` if they should exist (add .gitkeep with documentation).

### 5.2 Standardize PostCSS Config Naming
Rename both to consistent extension:
```bash
# Option 1: Both .mjs
mv /home/user/dev/syntolabs/mypage/postcss.config.js /home/user/dev/syntolabs/mypage/postcss.config.mjs

# Option 2: Both .js (update landingpage)
# Already done - both use .mjs now
```

### 5.3 Move Planning Files
```bash
mkdir -p /home/user/dev/syntolabs/doc/operations/projects
mv /home/user/dev/syntolabs/task_plan.md /home/user/dev/syntolabs/doc/operations/projects/agentmail-task-plan.md
mv /home/user/dev/syntolabs/findings.md /home/user/dev/syntolabs/doc/operations/projects/agentmail-findings.md
mv /home/user/dev/syntolabs/progress.md /home/user/dev/syntolabs/doc/operations/projects/agentmail-progress.md
mv /home/user/dev/syntolabs/cal_deploy_plan.md /home/user/dev/syntolabs/doc/operations/projects/calcom-deploy-plan.md
mv /home/user/dev/syntolabs/AGENTMAIL_SETUP.md /home/user/dev/syntolabs/doc/technical/agentmail-setup-guide.md
```

### 5.4 Update Components Index (Optional)
**File**: `/home/user/dev/syntolabs/landingpage/src/components/index.ts`

Add missing component exports or remove file if not used.

**Commit**: `git commit -m "chore: remove empty directories, standardize naming, reorganize files"`

---

## Phase 6: Verification & Testing (30 minutes)
**Goal**: Ensure everything works after changes

### 6.1 Run Install
```bash
cd /home/user/dev/syntolabs/landingpage && bun install
cd /home/user/dev/syntolabs/mypage && bun install
```

### 6.2 Run Lint
```bash
cd /home/user/dev/syntolabs/landingpage && bun run lint
cd /home/user/dev/syntolabs/mypage && bun run lint
```

### 6.3 Run Build
```bash
cd /home/user/dev/syntolabs/landingpage && bun run build
```

### 6.4 Run Tests (if any)
```bash
# Add test commands if they exist
```

### 6.5 Verify Cal.com Integration
```bash
node /home/user/dev/syntolabs/landingpage/scripts/test-cal-integration.js
```

### 6.6 Check for Broken Imports
```bash
cd /home/user/dev/syntolabs/landingpage && npx tsc --noEmit
cd /home/user/dev/syntolabs/mypage && npx tsc --noEmit
```

**Commit**: `git commit -m "chore: verification and testing - all checks pass"`

---

## Deployment

### Final Push
```bash
git push origin master
```

### Deploy Landingpage
```bash
cd /home/user/dev/syntolabs
vercel --prod
```

---

## Rollback Plan

If issues arise:

1. **Per-phase rollback**:
   ```bash
   git revert HEAD~N  # Revert N commits back
   ```

2. **Full rollback**:
   ```bash
   git reset --hard <commit-before-cleanup>
   git push --force  # Only if necessary
   ```

3. **Selective file restore**:
   ```bash
   git checkout <commit> -- path/to/file
   ```

---

## Success Metrics

- [ ] All 4 critical issues resolved
- [ ] All 5 high-priority issues resolved
- [ ] 80%+ of medium/low issues resolved
- [ ] `bun install` succeeds in both projects
- [ ] `bun run build` succeeds
- [ ] `bun run lint` passes (or has no new errors)
- [ ] Cal.com integration test passes
- [ ] No broken imports
- [ ] No TypeScript errors
- [ ] Git history clean with meaningful commits

---

## Time Estimates

| Phase | Time | Cumulative |
|-------|------|------------|
| Phase 1: Critical | 30 min | 30 min |
| Phase 2: Dependencies | 30 min | 1 hr |
| Phase 3: Documentation | 45 min | 1 hr 45 min |
| Phase 4: Configuration | 45 min | 2 hr 30 min |
| Phase 5: Cleanup | 15 min | 2 hr 45 min |
| Phase 6: Verification | 30 min | 3 hr 15 min |

**Buffer**: +30 minutes for unexpected issues  
**Total Estimated Time**: 3-4 hours

---

## Notes

- **Do not commit .env files** - Ensure they remain in .gitignore
- **Test each phase** before proceeding to next
- **Keep commits atomic** - one logical change per commit
- **Document any deviations** from this plan
- **Backup strategy**: Git history serves as backup

---

## Post-Cleanup Actions

1. Update team on new file locations
2. Archive old documentation references
3. Update onboarding docs if needed
4. Monitor build times (should improve)
5. Schedule periodic cleanup reviews
