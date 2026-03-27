# Off Track

Off Track is a personal allowance and expense tracker built with React, Vite, Tailwind CSS, and Supabase. It gives each signed-in user a private dashboard to record allowance entries, log expenses, and see how spending is distributed across categories.

## Features

- Email/password authentication with Supabase Auth
- Protected dashboard for signed-in users
- Create allowance entries with weekly or monthly frequency
- Log expenses with category and optional description
- View running totals for allowance, expenses, and remaining balance
- Review recent transactions
- Visualize category spending with a chart
- Row Level Security policies so users only access their own data

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- React Router 7
- Supabase
- Recharts
- Lucide React

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

Create a Supabase project and copy your:

- Project URL
- Anon public key

### 3. Configure environment variables

Add the following variables to `.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set up the database

Run the SQL in [`supabase/schema.sql`](/c:/Users/danie/Documents/Code%20Repository/off-track/supabase/schema.sql) inside the Supabase SQL editor. This script:

- creates the `allowances` table
- creates the `expenses` table
- enables Row Level Security on both tables
- adds policies so authenticated users can only insert and read their own records

### 5. Start the development server

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run build` creates a production build in `dist/`
- `npm run preview` serves the production build locally

## Project Structure

```text
.
|-- public/
|-- src/
|   |-- components/
|   |-- hooks/
|   |-- pages/
|   |-- services/
|   `-- utils/
|-- supabase/
|   `-- schema.sql
|-- .env
|-- package.json
`-- vite.config.js
```

## How It Works

- Authentication is handled with Supabase Auth using email and password.
- The app checks auth state before rendering protected routes.
- Allowance and expense records are stored in Supabase and filtered by `user_id`.
- Dashboard totals are calculated client-side from the user's records.
- Expense categories are grouped and rendered as a pie chart for a quick spending breakdown.

## Notes

- This project currently does not include automated tests.
- The app expects valid Supabase environment variables at startup and will throw an error if they are missing.
