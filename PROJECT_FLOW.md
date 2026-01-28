# Portfolio Project - Code Flow & Architecture

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Data Flow](#data-flow)
4. [Component Connections](#component-connections)
5. [Implementation Details](#implementation-details)

---

## 🎯 Project Overview

**Tech Stack:**
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI + shadcn/ui
- **Animations:** Motion (Framer Motion)
- **Smooth Scroll:** Lenis
- **Theme:** next-themes (Dark/Light mode)

---

## 📁 File Structure

```
adityarao-portfolio/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout (wraps all pages)
│   │   ├── page.tsx                 # Home page
│   │   └── globals.css              # Global styles + Tailwind
│   │
│   ├── components/
│   │   ├── common/                   # Reusable components
│   │   │   ├── Navbar.tsx           # Navigation bar
│   │   │   ├── Footer.tsx           # Footer
│   │   │   ├── Container.tsx        # Page wrapper
│   │   │   ├── Skill.tsx            # Skill badge component
│   │   │   ├── ThemeProviders.tsx   # Theme context provider
│   │   │   └── ThemeSwitch.tsx      # Dark/Light mode toggle
│   │   │
│   │   ├── landing/                  # Page sections
│   │   │   └── Hero.tsx             # Hero section
│   │   │
│   │   ├── technologies/             # Tech icon SVGs
│   │   │   ├── TypeScript.tsx
│   │   │   ├── ReactIcon.tsx
│   │   │   ├── NextJs.tsx
│   │   │   ├── NodeJs.tsx
│   │   │   ├── MongoDB.tsx
│   │   │   ├── PostgreSQL.tsx
│   │   │   ├── Prisma.tsx
│   │   │   ├── Bun.tsx
│   │   │   └── JavaScript.tsx
│   │   │
│   │   ├── svgs/                     # Icon components
│   │   │   ├── Github.tsx
│   │   │   ├── LinkedIn.tsx
│   │   │   ├── Mail.tsx
│   │   │   ├── X.tsx
│   │   │   ├── CV.tsx
│   │   │   └── Chat.tsx
│   │   │
│   │   └── ui/                       # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── tooltip.tsx
│   │       ├── sheet.tsx
│   │       └── ... (14 components)
│   │
│   ├── config/                       # Configuration files
│   │   ├── Hero.tsx                 # Hero section config
│   │   ├── Navbar.tsx               # Navbar config
│   │   └── Footer.tsx               # Footer config
│   │
│   ├── lib/                          # Utility functions
│   │   ├── utils.ts                 # Tailwind cn() helper
│   │   └── hero.ts                  # Template parser
│   │
│   └── hooks/                        # Custom React hooks
│
├── public/                           # Static assets
│   └── assets/
│       └── logo.png                 # Avatar image
│
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript config
├── next.config.ts                   # Next.js config
└── package.json                     # Dependencies
```

---

## 🔄 Data Flow

### Main Flow: How the App Renders

```
1. User visits website
   ↓
2. layout.tsx (Root Layout)
   ├── Loads globals.css (Tailwind styles)
   ├── Wraps with ViewTransitions (page transitions)
   ├── Wraps with ThemeProvider (dark/light mode)
   ├── Wraps with ReactLenis (smooth scroll)
   └── Renders structure:
       ├── Navbar (sticky top)
       ├── {children} (page content)
       └── Footer
   ↓
3. page.tsx (Home Page)
   └── Renders Hero component inside Container
   ↓
4. Hero.tsx (Hero Section)
   ├── Imports heroConfig from config/Hero.tsx
   ├── Imports parseTemplate from lib/hero.ts
   ├── Renders:
   │   ├── Avatar image
   │   ├── Name + Title
   │   ├── Description (with parsed skills)
   │   ├── CTA Buttons
   │   └── Social Links
```

### Config-Driven Architecture

```
config/Hero.tsx (Configuration)
├── heroConfig object
│   ├── name: "Aditya Rao"
│   ├── title: "Full Stack Developer"
│   ├── avatar: "/assets/logo.png"
│   ├── skills: [TypeScript, React, Next.js, Bun, PostgreSQL]
│   ├── description: { template: "..." }
│   ├── buttons: [Resume, Contact]
│   └── social: [GitHub, LinkedIn, X, Email]
│
└── skillComponents mapping
    ├── TypeScript → TypeScript.tsx
    ├── ReactIcon → ReactIcon.tsx
    ├── NextJs → NextJs.tsx
    └── ...

    ↓ (imported by)

components/landing/Hero.tsx
├── Reads heroConfig
├── Calls parseTemplate() to process description
├── Maps over skills, buttons, social links
└── Renders UI components
```

---

## 🔗 Component Connections

### 1. Layout Architecture

```
layout.tsx
├── ViewTransitions (page transitions)
│   └── html + body
│       └── ThemeProvider (theme context)
│           └── ReactLenis (smooth scroll)
│               ├── Navbar
│               ├── {children} ← page.tsx renders here
│               └── Footer
```

### 2. Hero Component Flow

```
Hero.tsx
│
├── Imports
│   ├── heroConfig (data)
│   ├── skillComponents (icon mapping)
│   ├── socialLinks (social media)
│   ├── parseTemplate (parser function)
│   ├── Container (layout wrapper)
│   ├── Skill (skill badge component)
│   ├── Button (shadcn button)
│   ├── Tooltip (shadcn tooltip)
│   └── SVG icons (CV, Chat)
│
├── renderDescription() function
│   ├── Calls parseTemplate(description.template, skills)
│   ├── Returns array of parts:
│   │   ├── type: "skill" → renders <Skill> with icon
│   │   ├── type: "bold" → renders <b> tag
│   │   └── type: "text" → renders <span>
│   └── Maps parts to JSX
│
└── JSX Structure
    ├── Container (wrapper)
    │   ├── Image (avatar)
    │   ├── div (text area)
    │   │   ├── h1 (name + title)
    │   │   └── div (description with skills)
    │   ├── div (buttons)
    │   │   └── Button components
    │   └── div (social links)
    │       └── Tooltip + Link components
```

### 3. Template Parser (lib/hero.ts)

```
parseTemplate(template, skills)
│
├── Input: "I build apps with {skills:0}, {skills:1} and {skills:2}. Focus on <b>UI design</b>."
│
├── Split by {skills:\d+} pattern
│   ├── "I build apps with "
│   ├── "{skills:0}"
│   ├── ", "
│   ├── "{skills:1}"
│   ├── " and "
│   ├── "{skills:2}"
│   ├── ". Focus on "
│   ├── "<b>UI design</b>"
│   └── "."
│
├── Process each part
│   ├── If {skills:N} → lookup skill[N] → return { type: "skill", skill: {...} }
│   ├── If <b>text</b> → return { type: "bold", text: "..." }
│   └── Else → return { type: "text", text: "..." }
│
└── Output: Array of objects
    [
      { type: "text", text: "I build apps with " },
      { type: "skill", skill: { name: "TypeScript", ... } },
      { type: "text", text: ", " },
      { type: "skill", skill: { name: "React", ... } },
      ...
    ]
```

### 4. Skill Component

```
Skill.tsx
│
├── Props: { name, href, children }
│
├── Renders
│   └── Link (next-view-transitions)
│       └── div (wrapper with styling)
│           ├── {children} ← Technology icon SVG
│           └── <p>{name}</p>
│
└── Styling
    ├── Border: dashed
    ├── Background: semi-transparent
    ├── Dark mode support
    └── Inner shadow effect
```

---

## 💡 Implementation Details

### How Configuration Works

**Step 1: Define in config/Hero.tsx**
```tsx
export const heroConfig = {
  name: "Aditya Rao",
  skills: [
    { name: "TypeScript", href: "...", component: "TypeScript" }
  ],
  description: {
    template: "I build with {skills:0} and focus on <b>UI</b>."
  }
}

export const skillComponents = {
  TypeScript: TypeScript  // Maps string to component
}
```

**Step 2: Parse in lib/hero.ts**
```tsx
parseTemplate(template, skills)
// Converts template string to renderable parts
// {skills:0} → looks up skills[0] → returns skill object
```

**Step 3: Render in Hero.tsx**
```tsx
const parts = parseTemplate(description.template, skills);

parts.map((part) => {
  if (part.type === "skill") {
    const Icon = skillComponents[part.skill.component];
    return <Skill><Icon /></Skill>;
  }
  if (part.type === "bold") {
    return <b>{part.text}</b>;
  }
  return <span>{part.text}</span>;
})
```

### How Theming Works

```
1. ThemeProvider (next-themes)
   ├── Wraps entire app in layout.tsx
   ├── Reads system preference or localStorage
   └── Adds class="dark" to <html> when dark mode
   
2. Tailwind CSS
   ├── Uses .dark class prefix
   ├── Example: bg-white dark:bg-black
   └── CSS variables defined in globals.css
   
3. ThemeSwitch Component
   ├── useTheme() hook from next-themes
   ├── Dropdown with options: Light, Dark, System
   └── Updates theme on click
```

### How Smooth Scroll Works

```
ReactLenis (from lenis library)
├── Wraps content in layout.tsx
├── Intercepts scroll events
├── Applies smooth easing animation
└── Result: Butter-smooth scrolling
```

### How Routing Works

```
Next.js App Router
├── app/layout.tsx → Root layout
├── app/page.tsx → Home page (/)
├── app/about/page.tsx → About page (/about)
└── Automatic file-based routing
```

---

## 🎨 Styling System

### Tailwind CSS v4 Setup

```
globals.css
├── @import "tailwindcss"
├── @plugin "@tailwindcss/typography"
├── @theme inline { ... } → Custom CSS variables
└── CSS custom properties for colors
```

### Color System

```
CSS Variables (globals.css)
--color-background: oklch(...)
--color-foreground: oklch(...)
--color-primary: oklch(...)
  ↓ (used in)
Tailwind Classes
bg-background
text-foreground
text-primary
  ↓ (applied in)
Components
<div className="bg-background text-foreground">
```

---

## 🔑 Key Concepts

### 1. **Config-Driven Design**
- All content is in `config/` files
- Easy to update without touching components
- Change name/skills/description in one place

### 2. **Template System**
- Description uses template strings
- `{skills:0}` → Dynamically inserts skill
- `<b>text</b>` → Bold formatting
- Parsed by `parseTemplate()` function

### 3. **Component Composition**
```
Hero
├── Container (layout)
├── Skill (badge)
│   └── Technology Icon (SVG)
├── Button (shadcn)
│   └── Icon (SVG)
└── Tooltip (shadcn)
    └── Link (next-view-transitions)
```

### 4. **Type Safety**
- TypeScript ensures type safety
- Config types match component props
- No runtime errors from wrong data types

---

## 🚀 Data Flow Summary

```
1. User Request
   ↓
2. Next.js Server
   ↓
3. layout.tsx (wraps page)
   ↓
4. page.tsx (home)
   ↓
5. Hero.tsx
   ├── Reads config/Hero.tsx
   ├── Calls lib/hero.ts parseTemplate()
   ├── Maps skillComponents
   ├── Renders UI components
   │   ├── components/common/Skill.tsx
   │   ├── components/technologies/*.tsx
   │   ├── components/svgs/*.tsx
   │   └── components/ui/*.tsx
   ↓
6. Browser renders HTML with Tailwind styles
   ↓
7. Client-side hydration (React)
   ↓
8. Interactive UI ready!
```

---

## 📝 How to Customize

### Add a New Skill

1. **Create icon component**
   ```tsx
   // src/components/technologies/Python.tsx
   export default function Python() {
     return <svg>...</svg>;
   }
   ```

2. **Add to skillComponents mapping**
   ```tsx
   // src/config/Hero.tsx
   export const skillComponents = {
     ...
     Python: Python
   }
   ```

3. **Add to skills array**
   ```tsx
   export const heroConfig = {
     skills: [
       ...
       { name: "Python", href: "...", component: "Python" }
     ]
   }
   ```

4. **Use in template**
   ```tsx
   template: "I code in {skills:5} too!"
   ```

### Change Personal Info

Just edit `config/Hero.tsx`:
```tsx
export const heroConfig = {
  name: "Your Name",
  title: "Your Title",
  avatar: "/your-image.png",
  ...
}
```

---

## 🎯 Summary

**Main Concepts:**
1. ✅ Config-driven architecture (easy to customize)
2. ✅ Template parsing system (dynamic content)
3. ✅ Component composition (reusable pieces)
4. ✅ Type-safe with TypeScript
5. ✅ Tailwind CSS for styling
6. ✅ Dark/Light theme support
7. ✅ Smooth animations and transitions

**File Flow:**
```
Config Files → Parser → Components → UI
```

**Key Files:**
- `config/Hero.tsx` - Edit this to change content
- `lib/hero.ts` - Template parsing logic
- `components/landing/Hero.tsx` - UI rendering
- `app/layout.tsx` - App structure
- `globals.css` - Styling

---

*Created: January 28, 2026*
*Project: Aditya Rao Portfolio*
