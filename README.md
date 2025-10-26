# Project-pro 🚀

Project-pro is a modern, full-stack project management application designed to help you and your team stay organized and on track. It provides a comprehensive dashboard, detailed project and task management, team collaboration features, and more.

## ✨ Key Features

-   **Dashboard Overview**: Get a quick glance at your project's health with stats on active projects, pending tasks, team members, and upcoming events.
-   **Project Management**: Full CRUD (Create, Read, Update, Delete) functionality for your projects.
-   **Task Tracking**: Manage tasks associated with each project.
-   **Team Collaboration**: Add and manage your team members.
-   **Event Scheduling**: Keep track of important dates and milestones.
-   **Resource Management**: Allocate and manage project resources.
-   **Authentication**: Secure user authentication and protected routes.
-   **Responsive UI**: A clean, modern, and responsive user interface built for all screen sizes.
-   **Loading Skeletons**: Smooth user experience with skeleton loaders while data is being fetched.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Backend & Database**: [Supabase](https://supabase.io/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Lucide React](https://lucide.dev/) for icons.
-   **State Management**: React Context API

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

-   Node.js (v18.x or later)
-   npm, yarn, or pnpm
-   A Supabase account and project.

### 1. Clone the Repository

```bash
git clone https://github.com/Hemanth2709/Project-Pro.git
cd Project-pro
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```


### 3. Set Up Environment Variables

## You'll need to connect the project to your own Supabase instance.

Steps:

- Create a new project on Supabase
- Go to Project Settings > API.
- Find your Project URL and anon public key.
- Create a .env.local file in the root directory of your project.
- Add your Supabase credentials to the file:

NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY


### 4. Set up the database schema.

Use the SQL statements from your Supabase project's schema.sql, or

Manually create the following tables:

- projects
- tasks
- team_members
- events
- resources

###  5. Run the Development Server
npm run dev
# or
yarn dev
# or
pnpm dev


Open your browser and navigate to:
👉 http://localhost:3000

📂 Project Structure
app/          # Next.js App Router structure (routes, pages, layouts)
components/   # Shared React components (UI + feature components)
contexts/     # React Context for global state management (DataContext.tsx)
lib/          # Utility functions (including Supabase client setup)
