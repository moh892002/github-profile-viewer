GitHub Profile Viewer

Search and explore any GitHub user’s profile, repositories, and recent activity with a clean, responsive UI.

**Overview**

- Built with Vue 3, Vite, Vue Router, and Tailwind CSS
- Uses the public GitHub REST API (no authentication required)
- Fast local development and optimized production builds

**Features**

- Search users by GitHub username
- View profile details, stats, and external links
- Browse repositories with sorting options
- Inspect recent public activity with event filters
- Persist recent searches in local storage

**Tech Stack**

- Vue 3
- Vite 7
- Vue Router 4
- Tailwind CSS 4

**Requirements**

- Node.js 20.19+ or 22.12+
- npm 9+

**Getting Started**

- Install dependencies:

```bash
npm install
```

- Start the dev server:

```bash
npm run dev
```

- Build for production:

```bash
npm run build
```

- Preview the production build locally:

```bash
npm run preview
```

**Usage**

- Open the app and enter a GitHub username
- Navigate between Profile, Repositories, and Activity views
- Click external links to open GitHub pages

**Project Structure**

```
github-profile-viewer/
├─ src/
│  ├─ assets/
│  │  └─ index.css
│  ├─ components/
│  │  ├─ Home.vue
│  │  ├─ UserProfile.vue
│  │  ├─ RepositoryList.vue
│  │  ├─ UserActivity.vue
│  │  └─ NotFound.vue
│  ├─ router/
│  │  └─ index.js
│  ├─ services/
│  │  └─ githubApi.js
│  └─ main.js
└─ package.json
```

**API and Rate Limits**

- Requests are unauthenticated and subject to GitHub’s public rate limits
- If you hit rate limits, retry later or add authenticated requests in code

**Scripts**

- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

**Author**

- Mohammed S Bader
