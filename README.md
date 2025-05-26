# UrbanIQ Explorer

UrbanIQ Explorer is an AI-powered city guide application that helps users discover interesting places and plan personalized city tours.

Hosting: [Live Demo](https://nextjs-urbaniq-explorer.vercel.app/chat)

## Features

- **AI-Powered Chat Interface**: Chat with an AI travel assistant to get personalized recommendations
- **Tour Creation**: Generate custom tours based on your preferences
- **Tour History**: Browse and revisit your saved tours
- **Responsive Design**: Fully functional on both desktop and mobile devices
- **User Authentication**: Secure user authentication and profile management with Clerk
- **Internationalization**: Support for multiple languages (English, German, Russian)
- **Persistent Storage**: Tour data stored in MongoDB

## Tech Stack

- **Framework**: Next.js 15.3.1 with App Router
- **Language**: TypeScript
- **UI Libraries**:
  - TailwindCSS for styling
  - Radix UI components
  - Lucide icons
- **State Management**:
  - React hooks for local state
  - Redux Toolkit for global state management
  - TanStack React Query for server state
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk authentication service
- **Internationalization**: Custom i18n implementation
- **Forms & Validation**: Zod
- **UI Enhancements**:
  - Sonner for toast notifications
  - Custom theme provider with light/dark mode support

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm/yarn/bun
- MongoDB (local or Atlas)

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
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   OPENAI_API_KEY="your_openai_key"

   MONGODB_URI="your_mongo_uri"

   NEXT_PUBLIC_DEMO_USER_EMAIL
   NEXT_PUBLIC_DEMO_USER_PASSWORD
   ```

4. Start the development server:

```bash
pnpm dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
