# UrbanIQ Explorer

UrbanIQ Explorer is an AI-powered city guide application that helps users discover interesting places and plan personalized city tours.

Hosting: [Live Demo](https://nextjs-urbaniq-explorer.vercel.app/chat)

## Features

- **AI-Powered Chat Interface**: Chat with an AI travel assistant to get personalized recommendations
- **Tour Creation**: Generate custom tours based on your preferences
- **Tour History**: Browse and revisit your saved tours
- **Responsive Design**: Fully functional on both desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15.3.1 with App Router
- **Language**: TypeScript
- **UI Libraries**:
  - TailwindCSS for styling
  - Radix UI components
  - Lucide icons
- **State Management**:
  - React hooks for local state
  - TanStack React Query for server state
- **Forms & Validation**: Zod
- **UI Enhancements**:
  - Sonner for toast notifications
  - Custom theme provider with light/dark mode support

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm/yarn/bun

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/urbaniq-explorer.git
   cd urbaniq-explorer
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   # Required environment variables
   OPENAI_API_KEY=your_openai_api_key

   # Authentication (if implemented)
   # CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   # CLERK_SECRET_KEY=your_clerk_secret_key

   # Database (when connected)
   # DATABASE_URL=your_database_connection_string
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
