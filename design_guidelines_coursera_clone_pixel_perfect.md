# Design Guidelines – Coursera Clone

## 1. Purpose
This document defines **strict design rules** for building a **pixel‑perfect, production‑grade UI** using **Tailwind CSS**.  
The agent must follow this **exact flow and standards**. Any deviation is unacceptable.

> Goal: UI should look **indistinguishable from Figma**, scalable, consistent, and industry‑ready.

---

## 2. Design Source of Truth
- **Primary reference:** Figma Design (provided link)
- **Secondary reference:** None

### Rules
- ❌ No visual guessing
- ❌ No personal creativity
- ❌ No spacing/font/color assumptions
- ✅ Every value must match Figma

---

## 3. Design Philosophy (Industry Standard)
- Minimal, clean, modern
- Strong visual hierarchy
- Predictable spacing system
- Accessibility‑first
- Consistent components

UI should feel:
- Calm
- Professional
- Trustworthy
- Learning‑focused

---

## 4. Tailwind Usage Rules (STRICT)

### Allowed
- Tailwind utility classes
- Tailwind config tokens
- Component‑level composition

### Forbidden
- ❌ Inline styles
- ❌ Hardcoded hex/rgb colors
- ❌ Custom CSS outside Tailwind (except globals)
- ❌ Arbitrary values unless present in config

---

## 5. Tailwind Config – Single Source of Truth

All design tokens must be defined **ONLY** in:
```
tailwind.config.ts
```

### Tokens to Define
- Colors
- Font families
- Font sizes
- Line heights
- Spacing scale
- Border radius
- Shadows
- Breakpoints

❌ No token duplication anywhere else

---

## 6. Color System

### Rules
- All colors must come from `theme.colors`
- Semantic naming only

### Example
```
primary
primary-hover
secondary
background
surface
text-primary
text-secondary
border-muted
success
warning
error
```

❌ No raw color usage in JSX

---

## 7. Typography System

### Fonts
- Font family defined in Tailwind config
- No font imports inside components

### Text Rules
- Use semantic HTML (`h1–h6`, `p`, `label`)
- Font size & weight strictly from config

### Hierarchy
- Page title
- Section heading
- Card title
- Body text
- Helper / meta text

No random font scaling

---

## 8. Spacing & Layout System

### Spacing Rules
- Use consistent spacing scale (4‑based or 8‑based)
- No arbitrary margin/padding values

### Layout
- Max width containers
- Centered content
- Predictable gutters

### Grid
- Cards → CSS grid
- Forms → vertical rhythm

---

## 9. Component Design Rules

### Components Must Be
- Reusable
- Stateless where possible
- Configurable via props

### Structure
```
Component
├─ Header
├─ Content
└─ Actions
```

### States (Mandatory)
- Default
- Hover
- Active
- Disabled
- Loading
- Error

---

## 10. Buttons

### Rules
- Primary / Secondary / Ghost only
- Consistent height & padding
- Icon + text alignment perfect

❌ No one‑off buttons

---

## 11. Forms & Inputs

### Rules
- Visible labels (no placeholder‑only forms)
- Clear error states
- Disabled & loading states

### Validation
- Error messages below fields
- Same spacing everywhere

---

## 12. Images & Media (VERY IMPORTANT)

### Rules
- ❌ Do NOT generate images
- ❌ Do NOT download random images

### Usage
- If image URL exists → use it
- If image not available →
  - Render styled `<img>` tag
  - Keep aspect ratio
  - Use placeholder background

Example:
```
<img class="w-full h-[220px] bg-surface rounded-lg" />
```

No visual breaking allowed

---

## 13. Pixel‑Perfect Requirements

- Spacing must match Figma exactly
- Font sizes must match exactly
- Border radius & shadows must match
- No “almost similar” UI

If unsure → **ask, don’t assume**

---

## 14. Responsive Design Rules

### Breakpoints
- Mobile
- Tablet
- Desktop

### Rules
- Mobile‑first
- No layout jumps
- No hidden essential content

---

## 15. Accessibility (Mandatory)

- Proper contrast ratios
- Keyboard navigable
- Focus states visible
- Semantic HTML

---

## 16. Design QA Checklist

Before marking task complete:
- Matches Figma 1:1
- No hardcoded styles
- No inline CSS
- All colors from Tailwind config
- Responsive verified
- Empty image states handled

---

## 17. Non‑Negotiables

- Pixel‑perfect only
- Tailwind config tokens only
- No creativity
- No shortcuts

> **If design does not match Figma exactly, it is considered incorrect.**

