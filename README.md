# GitHub Repository Explorer

A modern web application built with **Next.js** and **React** that allows users to explore GitHub repositories by username.  
It supports infinite scrolling, detailed views, sorting, and a dark mode toggle.

---

## 🔧 Technologies Used

- **Next.js (App Router)** – modern routing and structure
- **React Hooks** – `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`
- **Custom Hook** – `useSearchRestore` for restoring search state
- **Axios** – for making API requests to GitHub
- **CSS Modules** – scoped styling for components
- **sessionStorage** – for saving state between navigation
- **GitHub REST API**

---

## 📦 Features

- 🔍 **Search GitHub users** and view their public repositories
- ♾️ **Infinite scrolling** for seamless UX
- ⭐ **Sort repositories** by stars
- 🌙 **Dark mode toggle**
- 🔙 **Back button** restores previous search and scroll
- 👤 **Contributor details** (avatar, name, commits) with caching
- ✅ **Optimized performance** with `useMemo`,  `useCallback` and `debounce`

---

## 🔐 Environment Variables

To access the GitHub API without hitting rate limits, you'll need to add a personal access token.

1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Generate a token with **public_repo** access
3. Create a file named `.env.local` in the project root:
4. NEXT_PUBLIC_GITHUB_TOKEN="your token"

## 🚀 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/github-explorer.git

# 2. Navigate to the project
cd github-explorer

# 3. Install dependencies
npm install

# 4. Add your .env.local file (see above)

# 5. Run the dev server
npm run dev

Then open http://localhost:3000 

💡 Final Notes
The app uses sessionStorage to simplify restoring search results after clicking into a repo and going back.

Folder structure is clean and scalable for future additions.

The utils/ and hooks/ folders help keep logic modular and reusable.
