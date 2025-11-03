# CSV Orbit Project Instructions

## Project Status
- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements - Next.js app with Tailwind CSS, Turbopack, and App Router for climate projects
- [x] Scaffold the Project - Created Next.js app with TypeScript, Tailwind, ESLint, App Router, and Turbopack
- [x] Customize the Project - Added climate projects gathering functionality with business-friendly interface
- [x] Install Required Extensions - No additional extensions required
- [x] Compile the Project - Successfully built without errors
- [x] Create and Run Task - Created development task
- [x] Launch the Project - Development server running on http://localhost:3000
- [x] Ensure Documentation is Complete - Updated README.md and cleaned up instructions

## Project Overview

This is **CSV Orbit**, an AI-enabled opportunity radar for Climate Smart Ventures. The application helps discover, track, and manage development and funding opportunities from global sources.

### Key Features Implemented
- Business-friendly source management interface
- Real-time data collection from predefined and custom sources
- Interactive opportunities dashboard with filtering and sorting
- Status tracking for opportunities (new → reviewed → applied → archived)
- Responsive design with Tailwind CSS
- TypeScript for type safety
- API endpoint for data scraping simulation

### Technology Stack
- **Framework**: Next.js 16.0.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Turbopack (enabled)
- **Linting**: ESLint
- **UI Components**: Custom components with Headless UI
- **Icons**: Lucide React

### Development Server
The application is running on http://localhost:3000 with Turbopack enabled for fast development.

### Next Steps for Production
1. Implement real web scraping logic (replace mock API)
2. Add AI summarization service integration
3. Implement data persistence (database)
4. Add authentication and user management
5. Set up deployment pipeline
6. Integrate notification systems (Slack, email)