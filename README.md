# 🔗 link-hub

A modern, full-stack link management platform that allows users to create, organize, and share their personal link dashboard with the world. Built with Next.js, TypeScript, and PostgreSQL.

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_App-4CAF50)](https://link-hub-tan.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.18-000000)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791)](https://neon.tech/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<br />

## 🚀 Live Demo

**View the live application:** [https://link-hub-tan.vercel.app](https://link-hub-tan.vercel.app)

<br />

## ✨ Features

### 🔐 Authentication
- **GitHub OAuth Integration** — Secure and seamless login
- **Session Management** — Persistent sessions with NextAuth.js
- **Protected Routes** — Admin dashboard is gated behind authentication

### 📊 Dashboard
- **Create Links** — Add new links with titles, URLs, and icons
- **Edit Links** — Update existing links with real-time changes
- **Delete Links** — Remove links with a single click
- **Immediate UI Updates** — Changes appear instantly without page refresh

### 👤 Public User Profiles
- **Dynamic Pages** — Each user gets a unique public profile
- **Real-time Click Tracking** — Click counts update instantly
- **Clean Design** — Beautiful, responsive layout

### 🛠️ Technical Highlights
- **Full-Stack Next.js** — Server Components, API routes, and App Router
- **Type Safety** — Full TypeScript coverage across the entire application
- **Database** — PostgreSQL with Drizzle ORM
- **Performance** — Optimized with React.memo, useCallback, and Suspense
- **Responsive** — Works on all devices (mobile, tablet, desktop)

<br />

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes, NextAuth.js |
| **Database** | PostgreSQL (Neon), Drizzle ORM |
| **Deployment** | Vercel |
| **Package Manager** | npm |

<br />

## 📁 Project Structure

```
link-hub/
├── src/
│   ├── app/
│   │   ├── admin/               # Protected admin dashboard
│   │   │   ├── links/
│   │   │   │   ├── new/         # Create new link
│   │   │   │   └── [id]/edit/   # Edit existing link
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   └── links/           # CRUD API routes
│   │   ├── auth/
│   │   │   └── signin/          # Login page
│   │   ├── [userId]/            # Dynamic user profiles
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/              # Reusable UI components
│   ├── lib/
│   │   └── db/                  # Database schema & connection
│   └── types/                   # TypeScript type definitions
├── drizzle/                     # Database migrations
├── public/                      # Static assets
└── package.json
```

<br />

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Neon](https://neon.tech) PostgreSQL database
- A [GitHub OAuth App](https://github.com/settings/developers)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tolkensak/link-hub.git
   cd link-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://..."

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # GitHub OAuth
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate migrations
   npx drizzle-kit generate

   # Push to database
   npx drizzle-kit push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

<br />

## 📚 Usage Guide

### Creating a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the details:
   - **Application name:** `link-hub`
   - **Homepage URL:** `http://localhost:3000` (development) or your Vercel URL
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
4. Copy the **Client ID** and **Client Secret** to your `.env.local`

### Managing Links

1. **Sign in** with GitHub
2. **Add a link:** Click "Add New Link" → Fill in the details → Submit
3. **Edit a link:** Click "Edit" on any link → Update → Save
4. **Delete a link:** Click "Delete" → Confirm

### Your Public Profile

- Your profile is available at: `https://link-hub-tan.vercel.app/[your-user-id]`
- Share this link with anyone to showcase your links
- Click tracking is automatic — each click increments the counter

<br />

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test -- --ui

# Generate coverage report
npm run test -- --coverage
```

<br />

## 📦 Deployment

The easiest way to deploy is with Vercel:

1. **Push your code to GitHub**
2. **Import your repository** on [Vercel](https://vercel.com)
3. **Add environment variables** (same as `.env.local`)
4. **Deploy** — Vercel will automatically build and deploy your app

<br />

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

<br />

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

<br />

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — The React framework for production
- [Neon](https://neon.tech) — Serverless Postgres
- [Drizzle](https://orm.drizzle.team) — Type-safe SQL ORM
- [NextAuth.js](https://next-auth.js.org/) — Authentication for Next.js
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework

<br />

## 🔗 Links

- **Live Demo:** [https://link-hub-tan.vercel.app](https://link-hub-tan.vercel.app)
- **GitHub Repository:** [https://github.com/tolkensak/link-hub](https://github.com/tolkensak/link-hub)
- **GitHub Portfolio:** [https://tolkensak.github.io/tolkensak](https://tolkensak.github.io/tolkensak)
- **LinkedIn:** [https://www.linkedin.com/in/tolkyn-akhmetollauly-0a3873a9/](https://www.linkedin.com/in/tolkyn-akhmetollauly-0a3873a9/)

<br />

---

Built with ❤️ by [Tolkyn Akhmetollauly](https://github.com/tolkensak)
