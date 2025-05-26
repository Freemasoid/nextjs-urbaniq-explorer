# UrbanIQ Explorer

UrbanIQ Explorer is an AI-powered city guide application that helps users discover interesting places and plan personalized city tours.

Hosting: [Live Demo](https://nextjs-urbaniq-explorer.vercel.app/chat)

## Features

- **AI-Powered Chat Interface**: Chat with an AI travel assistant to get personalized recommendations
- **Multilingual Tour Creation**: Generate custom tours based on your preferences in English, German, or Russian
- **Tour History**: Browse and revisit your saved tours with search functionality
- **Responsive Design**: Fully functional on both desktop and mobile devices
- **User Authentication**: Secure user authentication and profile management with Clerk (including demo user access)
- **Internationalization**: Support for multiple languages (English, German, Russian)
- **Persistent Storage**: Tour data stored in MongoDB
- **Theme Support**: Light and dark mode with system preference detection
- **External Image Integration**: Unsplash API integration for city images

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
  - TanStack React Query for server state and mutations
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk authentication service
- **Internationalization**: Custom i18n implementation with language context
- **Forms & Validation**: Zod
- **UI Enhancements**:
  - Sonner for toast notifications
  - Custom theme provider with light/dark mode support
- **API Integration**:
  - OpenAI API for AI-powered chat and tour generation
  - Unsplash API for city images

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm/yarn/bun
- MongoDB (local or Atlas)
- OpenAI API key
- Unsplash API key
- Clerk account for authentication

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
   UNSPLASH_KEY="your_unsplash_api_key"

   MONGODB_URI="your_mongo_uri"

   # Optional: For demo user access
   NEXT_PUBLIC_DEMO_USER_EMAIL="demo_email"
   NEXT_PUBLIC_DEMO_USER_PASSWORD="demo_password"
   ```

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- **Home Page**: Learn about the application features
- **Chat**: Interact with the AI travel assistant for general travel recommendations
- **New Tour**: Generate a custom tour by entering a city and country
- **Tours**: View all your saved tours with search functionality
- **Profile**: Manage your account settings and theme preferences

## Deployment

The application is deployed on Vercel. For your own deployment:

1. Push your repository to GitHub
2. Connect to Vercel and deploy
3. Add the environment variables in the Vercel dashboard
