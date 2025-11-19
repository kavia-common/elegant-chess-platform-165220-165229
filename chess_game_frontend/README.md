# Ocean Chess Game - Astro Frontend

An elegant, interactive chess game built with Astro, React island, chess.js, and styled using Tailwind CSS per the Ocean Professional theme.

## 🎯 Features

- Fully playable, local chess game (no login required)
- Interactive chess board with drag/click for legal moves
- Modern responsive layout: board and move history, game controls, and status
- Ocean Professional palette: blues & amber accent, subtle gradients, rounded corners
- Dark/light mode theme toggle
- Move history list with navigation (jump, undo)
- Accessible for keyboard and screen readers
- Fast and deployable on Astro

## 🚀 Setup & Development

1. **Install dependencies** (from `chess_game_frontend` root):
    ```sh
    npm install
    ```
2. **Run locally**:
    ```sh
    npm run dev
    ```
    - Open browser to [http://localhost:3000](http://localhost:3000).

3. **Build for production**:
    ```sh
    npm run build
    npm run preview
    ```
    - Preview will be at the port shown (default: 3000).

## 🛠️ Tech Stack

- [Astro](https://astro.build) (static-first UI)
- [React.js] (island for interactivity, chess board)
- [chess.js](https://github.com/jhlywa/chess.js) (core game logic)
- [Tailwind CSS](https://tailwindcss.com/) (Ocean Professional theme)
- Responsive, accessible, modern UI

## 📁 Project Structure

```
/
├── public/
├── src/
│   ├── components/
│   │   ├── ChessBoard.jsx
│   │   ├── ChessApp.astro
│   │   └── ThemeToggle.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
└── package.json
```

Add static assets (images, icons, etc.) to the `public/` folder.

## 🔷 Ocean Professional Theme

- Blue (`#2563EB`) and amber (`#F59E0B`) as branding/accent.
- Modern, minimal, rounded corners and shadows.
- Subtle gradients for visual depth.
- Accessible dark/light mode (ThemeToggle button).

## ♟ Usage

Open the site. Play chess by clicking on pieces and choosing legal squares. History and controls appear alongside the board.

No backend connection or multiplayer is provided in this basic app.

---

Enjoy Ocean Chess! Contributions & issues welcome.

