# Hexar.ai Website Clone

A modern React.js application replicating the hexar.ai platform - an AI-driven collaborative platform for fault diagnosis and troubleshooting in robotics and engineering systems.

## Features

- **Modern Tech Stack**: React 18 + Vite + SCSS
- **Responsive Design**: Blue/white tech-oriented theme with mobile-first approach
- **Interactive Canvas**: Drag-and-drop component tree builder
- **AI Assistant**: Step-by-step troubleshooting guidance
- **Modular Architecture**: Easy to extend and customize

## Pages & Sections

- **Home**: Hero section, features, how it works, why Hexar, projects, contact
- **Projects**: Browse and filter public projects by domain
- **Workspace**: Collaborative canvas with component tree builder and AI assistant

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd hexar-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
hexar-website/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── auth/        # Authentication components
│   │   ├── home/        # Home page sections
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   └── workspace/   # Canvas & AI Assistant
│   ├── pages/           # Page components
│   ├── styles/          # Global SCSS files
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── main.scss
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Backend Integration Points

This frontend is designed with backend integration in mind. Key integration points:

### Authentication
- `src/components/auth/AuthModal.jsx` - Login/Register modal with placeholder handlers
- TODO: Integrate with authentication API (OAuth, JWT)

### Projects API
- `src/pages/Projects.jsx` - Public projects listing
- `src/components/home/PublicProjects.jsx` - Featured projects
- TODO: Replace mock data with API calls

### AI Assistant
- `src/components/workspace/AIAssistant.jsx` - AI chat interface
- TODO: Connect to AI/ML backend for actual responses

### Real-time Collaboration
- `src/pages/Workspace.jsx` - Canvas with component tree
- TODO: Implement WebSocket for real-time updates

## Customization

### Colors
Edit `src/styles/_variables.scss` to customize the color palette:

```scss
$color-primary: #2563EB;
$color-secondary: #0EA5E9;
// ... more color variables
```

### Components
All placeholder content is marked with TODO comments for easy replacement.

## Accessibility

- ARIA labels and roles throughout
- Keyboard navigation support
- Focus management
- Screen reader friendly

## License

MIT License
