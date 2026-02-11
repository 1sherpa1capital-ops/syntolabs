# Prompt for Frontend Developer

**Context:**
We are shifting Synto Labs from a "generic AI agency" to a high-velocity, productized service brand. We need to update the `landingpage/` project to reflect our new "Direct & Confident" voice and prepare for our "Waitlist" launch.

**Docs to Reference:**
- `doc/marketing/brand-guidelines.md` (For voice, typography, and color palette)
- `doc/marketing/launch-strategy.md` (For the Waitlist goal)

**Task:**
Update the landing page (`landingpage/src/`) to implement the "Phase 3: Beta Launch" requirements.

**Specific Requirements:**

1.  **Hero Section Overhaul:**
    - **Headline:** Change to **"Automate the Repetitive Work"**. (Font: Geist Black/900, size 6rem+).
    - **Subheadline:** "Your team spends 15+ hours/week on busywork. We build custom agent swarms to fix it. 48-hour delivery."
    - **CTA:** Change the primary button to **"Join Waitlist"**.

2.  **New Waitlist Component:**
    - Create a `WaitlistSection.tsx` component.
    - **Functionality:** Simple email input + "Join" button.
    - **Micro-copy:** "We accept 4 clients per month. Secure your spot."
    - **Style:** Minimalist, high-contrast (using our Accent color `#f97316` for the button).
    - **Placement:** Add this section immediately below the Hero and also in the Footer.

3.  **Voice & Tone Sweep:**
    - Scan existing components (`ThreeFeature.tsx`, etc.).
    - **Remove:** Any corporate jargon ("synergy", "leverage", "transformative").
    - **Replace with:** Direct, punchy language. (e.g., Change "Our solutions leverage AI..." to "We build agents that...").
    - **Social Proof:** Update the stats bar to say: **"4 Products Shipped • 10,000+ Hours Saved"**.

4.  **Tech Constraints:**
    - Stack: React 19, Tailwind v4, Framer Motion.
    - **Performance:** Ensure the Three.js background (`ThreeBackground.tsx`) does not block the "Waitlist" interaction. The input field must be focused and usable immediately.

**Deliverable:**
- A PR with the updated Hero, new Waitlist component, and refined copy.
- A screenshot of the new Hero section on Mobile.
