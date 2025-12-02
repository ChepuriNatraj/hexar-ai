# Hexar AI Website - Development Documentation

## Project Overview

This document provides a comprehensive overview of the development process for the Hexar AI website, a modern web application replicating the functionality and design of hexar.ai - an AI-driven collaborative platform for fault diagnosis and troubleshooting in robotics and engineering systems.

---

## Table of Contents

1. [Project Setup](#1-project-setup)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Design System](#4-design-system)
5. [Components Developed](#5-components-developed)
6. [Pages Created](#6-pages-created)
7. [Styling Architecture](#7-styling-architecture)
8. [Glassmorphism Theme Update](#8-glassmorphism-theme-update)
9. [Responsive Design](#9-responsive-design)
10. [Configuration Files](#10-configuration-files)

---

## 1. Project Setup

### Initial Setup Commands
```bash
# Created project directory
mkdir hexar-website
cd hexar-website

# Initialized npm project
npm init -y

# Installed dependencies
npm install react@18.3.1 react-dom@18.3.1 react-router-dom@6.22.3 lucide-react@0.344.0

# Installed dev dependencies
npm install -D vite@6.2.1 @vitejs/plugin-react@4.3.4 sass@1.86.0 eslint@9.22.0
```

### Project Initialization
- Created a React.js application using Vite as the build tool
- Configured SCSS modules for component-scoped styling
- Set up React Router for client-side navigation
- Integrated Lucide React for iconography

---

## 2. Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | Frontend UI framework |
| Vite | 6.2.1 | Build tool and dev server |
| React Router DOM | 6.22.3 | Client-side routing |
| Sass | 1.86.0 | CSS preprocessor |
| Lucide React | 0.344.0 | Icon library |
| ESLint | 9.22.0 | Code linting |

---

## 3. Project Structure

```
hexar-website/
├── index.html                 # Entry HTML file
├── package.json               # Project dependencies
├── vite.config.js             # Vite configuration
├── jsconfig.json              # JavaScript configuration
├── .eslintrc.cjs              # ESLint configuration
├── .gitignore                 # Git ignore rules
├── README.md                  # Project readme
├── public/
│   └── hexar-logo.svg         # Logo asset
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Main application component
    ├── components/
    │   ├── auth/
    │   │   ├── AuthModal.jsx
    │   │   └── AuthModal.module.scss
    │   ├── home/
    │   │   ├── Hero.jsx & .module.scss
    │   │   ├── Features.jsx & .module.scss
    │   │   ├── HowItWorks.jsx & .module.scss
    │   │   ├── DemoVideo.jsx & .module.scss
    │   │   ├── WhyHexar.jsx & .module.scss
    │   │   ├── PublicProjects.jsx & .module.scss
    │   │   └── ContactForm.jsx & .module.scss
    │   ├── layout/
    │   │   ├── Header.jsx & .module.scss
    │   │   └── Footer.jsx & .module.scss
    │   └── workspace/
    │       ├── AIAssistant.jsx & .module.scss
    │       ├── ComponentNode.jsx & .module.scss
    │       └── Toolbar.jsx & .module.scss
    ├── pages/
    │   ├── Home.jsx
    │   ├── Projects.jsx & .module.scss
    │   └── Workspace.jsx & .module.scss
    └── styles/
        ├── _variables.scss    # Design tokens
        ├── _mixins.scss       # Reusable mixins
        └── main.scss          # Global styles
```

---

## 4. Design System

### Original Color Palette (Phase 1)
```scss
// Primary Colors
$color-primary: #2563EB;      // Blue
$color-primary-dark: #1D4ED8;
$color-secondary: #0EA5E9;    // Cyan

// Text Colors
$text-primary: #0F172A;       // Dark gray
$text-secondary: #475569;     // Medium gray
```

### Updated Color Palette (Phase 2 - Glassmorphism)
```scss
// Primary Accent
$color-primary: #1a192b;      // Dark purple-black

// UI Colors
$color-secondary: #3367d9;    // Selection/Resize Blue
$color-edge: #b1b1b7;         // Edge/Line Color
$color-selection: rgba(0, 89, 220, 0.15);

// Text Colors
$text-primary: #222222;       // Dark text
$text-secondary: #555555;     // Medium text
$text-muted: #777777;         // Light text

// Glassmorphism
$glass-bg: rgba(255, 255, 255, 0.75);
$glass-border: rgba(255, 255, 255, 0.3);
$glass-blur: 20px;
```

### Typography
```scss
$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-family-mono: 'Fira Code', 'Consolas', monospace;

// Font Sizes (rem)
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 1.875rem;  // 30px
$font-size-4xl: 2.25rem;   // 36px
$font-size-5xl: 3rem;      // 48px
$font-size-6xl: 3.75rem;   // 60px
```

### Spacing Scale
```scss
$spacing-1: 0.25rem;   // 4px
$spacing-2: 0.5rem;    // 8px
$spacing-3: 0.75rem;   // 12px
$spacing-4: 1rem;      // 16px
$spacing-6: 1.5rem;    // 24px
$spacing-8: 2rem;      // 32px
$spacing-10: 2.5rem;   // 40px
$spacing-12: 3rem;     // 48px
$spacing-16: 4rem;     // 64px
$spacing-20: 5rem;     // 80px
$spacing-24: 6rem;     // 96px
```

### Border Radius
```scss
$radius-sm: 0.25rem;   // 4px
$radius-md: 0.375rem;  // 6px
$radius-lg: 0.5rem;    // 8px
$radius-xl: 0.75rem;   // 12px
$radius-2xl: 1rem;     // 16px
$radius-3xl: 1.5rem;   // 24px
$radius-full: 9999px;  // Pill shape
```

### Shadows (Glassmorphism Enhanced)
```scss
$shadow-sm: 0 1px 2px 0 rgba(26, 25, 43, 0.04);
$shadow-md: 0 4px 6px -1px rgba(26, 25, 43, 0.08);
$shadow-lg: 0 10px 15px -3px rgba(26, 25, 43, 0.1);
$shadow-xl: 0 20px 25px -5px rgba(26, 25, 43, 0.12);
$shadow-glow: 0 4px 14px 0 rgba(51, 103, 217, 0.3);
$shadow-glass: 0 8px 32px rgba(26, 25, 43, 0.12);
$shadow-glass-lg: 0 16px 48px rgba(26, 25, 43, 0.15);
```

---

## 5. Components Developed

### Layout Components

#### Header (`src/components/layout/Header.jsx`)
- **Purpose**: Fixed navigation header with glassmorphism effect
- **Features**:
  - Responsive navigation menu
  - Mobile hamburger menu
  - User authentication dropdown
  - Scroll-based background change
  - Logo with branding
- **State Management**: 
  - `isScrolled` - Tracks scroll position
  - `isMobileMenuOpen` - Mobile menu toggle
  - `isUserMenuOpen` - User dropdown toggle

#### Footer (`src/components/layout/Footer.jsx`)
- **Purpose**: Site footer with navigation and social links
- **Features**:
  - Brand section with tagline
  - Navigation link sections (Product, Resources, Company)
  - Social media links
  - Legal links and copyright
- **Styling**: Dark glassmorphism background

### Home Page Components

#### Hero (`src/components/home/Hero.jsx`)
- **Purpose**: Landing section with main call-to-action
- **Features**:
  - Main headline and subtitle
  - CTA buttons (Get Started, Watch Demo)
  - Featured project cards grid
  - Search/explore card
- **Design**: Glassmorphism cards with hover animations

#### Features (`src/components/home/Features.jsx`)
- **Purpose**: Showcase platform features
- **Features**:
  - 4-column responsive grid
  - Icon-based feature cards
  - Color-coded variants (blue, purple, green, orange)
  - Hover lift animation
- **Content**:
  - AI-Powered Diagnostics
  - Collaborative Workspace
  - Real-time Updates
  - Export & Share

#### HowItWorks (`src/components/home/HowItWorks.jsx`)
- **Purpose**: Step-by-step workflow explanation
- **Features**:
  - 4-step process visualization
  - Numbered step indicators
  - Connector lines between steps
  - Icon and description for each step
- **Steps**:
  1. Create Project
  2. Build Component Tree
  3. AI Analysis
  4. Resolve Issues

#### DemoVideo (`src/components/home/DemoVideo.jsx`)
- **Purpose**: Video demonstration section
- **Features**:
  - Video placeholder with play button
  - Glassmorphism video container
  - Gradient overlay pattern
  - Responsive aspect ratio (16:9)

#### WhyHexar (`src/components/home/WhyHexar.jsx`)
- **Purpose**: Value proposition cards
- **Features**:
  - 3-column grid layout
  - Large icon with gradient background
  - Color-coded cards (blue, green, purple)
- **Content**:
  - Faster Diagnosis
  - Better Collaboration
  - Smarter Solutions

#### PublicProjects (`src/components/home/PublicProjects.jsx`)
- **Purpose**: Showcase public project examples
- **Features**:
  - Domain filter buttons
  - Project cards with metadata
  - "Join Community" CTA card
  - View all projects link
- **State**: `activeFilter` for domain filtering

#### ContactForm (`src/components/home/ContactForm.jsx`)
- **Purpose**: Contact/inquiry form
- **Features**:
  - Form validation
  - Name, email, subject, message fields
  - Submit with loading state
  - Success/error messages
- **State Management**:
  - `formData` - Form field values
  - `errors` - Validation errors
  - `isSubmitting` - Loading state
  - `submitStatus` - Success/error state

### Authentication Components

#### AuthModal (`src/components/auth/AuthModal.jsx`)
- **Purpose**: Login/Register modal dialog
- **Features**:
  - Toggle between login/register modes
  - Form validation
  - Password visibility toggle
  - OAuth buttons (Google, GitHub)
  - Forgot password link
- **Props**: `isOpen`, `onClose`, `initialMode`
- **Styling**: Glassmorphism modal with backdrop blur

### Workspace Components

#### Toolbar (`src/components/workspace/Toolbar.jsx`)
- **Purpose**: Canvas toolbar with actions
- **Features**:
  - Zoom controls (+/-)
  - Undo/Redo buttons
  - Component type selector
  - Grid toggle
  - Selection info display
- **Props**: Various handlers and state values

#### ComponentNode (`src/components/workspace/ComponentNode.jsx`)
- **Purpose**: Draggable node in component tree
- **Features**:
  - Drag handle
  - Inline label editing
  - Color-coded type indicator
  - Edit/Delete actions
  - Connection point
- **Props**: `node`, `isSelected`, event handlers
- **Styling**: Glassmorphism with colored border

#### AIAssistant (`src/components/workspace/AIAssistant.jsx`)
- **Purpose**: AI chat sidebar for troubleshooting
- **Features**:
  - Chat message history
  - User/Assistant message styling
  - Typing indicator
  - Troubleshooting step cards
  - Quick action buttons
  - Message input with send button
- **State**:
  - `messages` - Chat history
  - `inputValue` - Current input
  - `isTyping` - AI typing state
- **Mock AI**: Simulates responses based on component tree context

---

## 6. Pages Created

### Home Page (`src/pages/Home.jsx`)
- **Route**: `/`
- **Purpose**: Landing page
- **Components Used**:
  - Hero
  - Features
  - HowItWorks
  - DemoVideo
  - WhyHexar
  - PublicProjects
  - ContactForm

### Projects Page (`src/pages/Projects.jsx`)
- **Route**: `/projects`
- **Purpose**: Browse public projects
- **Features**:
  - Search input
  - Domain filter buttons
  - Sort dropdown
  - Project cards grid
  - Loading and empty states
- **State**:
  - `searchTerm`
  - `selectedDomain`
  - `sortBy`
  - `projects` (mock data)

### Workspace Page (`src/pages/Workspace.jsx`)
- **Route**: `/workspace`
- **Purpose**: Main collaborative canvas
- **Features**:
  - Left sidebar with component library
  - Center canvas with node graph
  - Right panel with AI Assistant
  - Toolbar with actions
  - Drag-and-drop node creation
  - Pan and zoom controls
  - SVG connection lines
- **State**:
  - `nodes` - Component tree nodes
  - `connections` - Node connections
  - `selectedNode` - Currently selected
  - `zoom` - Canvas zoom level
  - `pan` - Canvas pan offset
  - `isSidebarOpen` / `isAssistantOpen`

---

## 7. Styling Architecture

### SCSS Module System
Each component has its own `.module.scss` file for scoped styling:

```jsx
// Component file
import styles from './Component.module.scss';

// Usage
<div className={styles.container}>
  <h1 className={styles.title}>Hello</h1>
</div>
```

### Global Styles (`src/styles/main.scss`)
- CSS Reset
- Base typography
- Utility classes
- Animation keyframes
- Global component classes

### Variables (`src/styles/_variables.scss`)
- Color palette
- Typography scale
- Spacing scale
- Border radius
- Shadows
- Transitions
- Breakpoints
- Z-index scale
- Component-specific values

### Mixins (`src/styles/_mixins.scss`)
```scss
// Responsive breakpoints
@mixin sm { @media (min-width: 640px) { @content; } }
@mixin md { @media (min-width: 768px) { @content; } }
@mixin lg { @media (min-width: 1024px) { @content; } }
@mixin xl { @media (min-width: 1280px) { @content; } }

// Layout helpers
@mixin flex-center { display: flex; align-items: center; justify-content: center; }
@mixin flex-between { display: flex; align-items: center; justify-content: space-between; }
@mixin container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 1rem; }

// Glassmorphism
@mixin glass {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(26, 25, 43, 0.12);
}

@mixin glass-card {
  @include glass;
  border-radius: 1rem;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 16px 48px rgba(26, 25, 43, 0.15);
    transform: translateY(-4px);
  }
}

// Buttons
@mixin button-primary {
  background: linear-gradient(135deg, #3367d9 0%, #3367d9 100%);
  color: white;
  box-shadow: 0 4px 14px rgba(51, 103, 217, 0.3);
  // ... other styles
}
```

### Vite Configuration for SCSS
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'],
        additionalData: `@import "./src/styles/_variables.scss";`
      }
    }
  }
})
```

---

## 8. Glassmorphism Theme Update

### What is Glassmorphism?
A modern UI design trend featuring:
- Semi-transparent backgrounds
- Blur effect (backdrop-filter)
- Subtle borders
- Soft shadows
- Layered appearance

### Changes Made

#### Background
```scss
// Before
background-color: #ffffff;

// After
background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 50%, #f0f2f5 100%);
background-attachment: fixed;

// Decorative gradients
&::before {
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(51, 103, 217, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(26, 25, 43, 0.06) 0%, transparent 50%);
}
```

#### Header
```scss
// Before
background: rgba(255, 255, 255, 0.9);
backdrop-filter: blur(10px);

// After
background: rgba(255, 255, 255, 0.75);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border-bottom: 1px solid rgba(255, 255, 255, 0.3);
```

#### Cards
```scss
// Before
background: #ffffff;
border: 1px solid #e2e8f0;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

// After
background: rgba(255, 255, 255, 0.75);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 8px 32px rgba(26, 25, 43, 0.12);
border-radius: 1rem;

&:hover {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 16px 48px rgba(26, 25, 43, 0.15);
  transform: translateY(-4px);
}
```

#### Buttons
```scss
// Primary Button
background: linear-gradient(135deg, #3367d9 0%, #3367d9 100%);
box-shadow: 0 4px 14px rgba(51, 103, 217, 0.3);

&:hover {
  box-shadow: 0 6px 20px rgba(51, 103, 217, 0.4);
  transform: translateY(-2px);
}

// Secondary/Ghost Button
background: rgba(255, 255, 255, 0.6);
backdrop-filter: blur(8px);
border: 1px solid rgba(177, 177, 183, 0.3);
```

#### Form Inputs
```scss
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(8px);
border: 1px solid rgba(177, 177, 183, 0.3);
border-radius: 0.75rem;

&:focus {
  border-color: #3367d9;
  box-shadow: 0 0 0 4px rgba(51, 103, 217, 0.1);
}
```

#### Modals & Dropdowns
```scss
background: rgba(255, 255, 255, 0.75);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 16px 48px rgba(26, 25, 43, 0.15);
```

### Components Updated for Glassmorphism
1. **Header** - Glass navigation bar
2. **Footer** - Dark glass footer
3. **Hero** - Glass project cards
4. **Features** - Glass feature cards
5. **HowItWorks** - Updated step indicators
6. **DemoVideo** - Glass video container
7. **WhyHexar** - Glass value cards
8. **PublicProjects** - Glass project cards & filters
9. **ContactForm** - Glass form container
10. **AuthModal** - Glass modal dialog
11. **Workspace Sidebar** - Glass panel
12. **Toolbar** - Glass toolbar
13. **ComponentNode** - Glass nodes
14. **AIAssistant** - Glass chat panel

---

## 9. Responsive Design

### Breakpoints
```scss
$breakpoint-sm: 640px;   // Small devices
$breakpoint-md: 768px;   // Tablets
$breakpoint-lg: 1024px;  // Laptops
$breakpoint-xl: 1280px;  // Desktops
$breakpoint-2xl: 1536px; // Large screens
```

### Mobile-First Approach
All components are designed mobile-first with progressive enhancement:

```scss
.grid {
  display: grid;
  grid-template-columns: 1fr;  // Mobile: single column
  gap: 1.5rem;

  @include md {
    grid-template-columns: repeat(2, 1fr);  // Tablet: 2 columns
  }

  @include lg {
    grid-template-columns: repeat(4, 1fr);  // Desktop: 4 columns
  }
}
```

### Mobile Navigation
- Hamburger menu toggle
- Full-screen mobile nav overlay
- Touch-friendly tap targets
- Glassmorphism background

### Workspace Responsiveness
```scss
@media (max-width: $breakpoint-md) {
  .sidebar,
  .assistantPanel {
    position: absolute;
    z-index: $z-dropdown;
    height: 100%;
  }
}
```

---

## 10. Configuration Files

### package.json
```json
{
  "name": "hexar-website",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.3"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.22.0",
    "sass": "^1.86.0",
    "vite": "^6.2.1"
  }
}
```

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'],
        additionalData: `@import "./src/styles/_variables.scss";`
      }
    }
  }
})
```

### jsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### .gitignore
```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
```

---

## Running the Project

### Development
```bash
npm run dev
# Opens at http://localhost:5173 (or next available port)
```

### Production Build
```bash
npm run build
# Outputs to /dist folder
```

### Preview Production Build
```bash
npm run preview
```

---

## Future Enhancements

1. **Backend Integration** - Connect to actual API
2. **Authentication** - Implement real auth flow
3. **Real-time Collaboration** - WebSocket integration
4. **AI Integration** - Connect to actual AI service
5. **Database** - Store projects and user data
6. **Testing** - Add unit and integration tests
7. **PWA Support** - Offline functionality
8. **Animations** - Enhanced micro-interactions
9. **Accessibility** - WCAG 2.1 AA compliance
10. **Internationalization** - Multi-language support

---

## Summary

This project successfully created a modern, responsive website replicating the Hexar AI platform with:

- ✅ React.js with Vite for fast development
- ✅ SCSS Modules for scoped styling
- ✅ Glassmorphism design theme
- ✅ Custom color palette (#1a192b, #3367d9, #b1b1b7)
- ✅ Responsive mobile-first design
- ✅ Interactive workspace with drag-and-drop
- ✅ AI Assistant chat interface
- ✅ Authentication modal
- ✅ Multiple page routes

**Total Files Created**: 40+
**Lines of Code**: ~5,000+
**Development Time**: Single session

---

*Documentation created: December 2, 2025*
*Project: Hexar AI Website Clone*
*Technology: React.js + Vite + SCSS*
