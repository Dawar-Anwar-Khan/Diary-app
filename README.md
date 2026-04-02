# 📋 Homework Whiteboard Generator

A Next.js app for school teachers to instantly generate and download homework whiteboard images — ready to share on WhatsApp class groups.

## Features

- 🗓️ **Date picker** — auto-formats as "Wednesday, 2nd April 2026"
- 🏫 **Class selector** — Nursery, LKG, UKG, Class 1–5
- 📚 **Subject rows** — add/remove subjects with task text
- 🖼️ **Live preview** — whiteboard updates as you type
- ⬇️ **High-quality download** — 1800×1200px PNG, perfect for WhatsApp
- 💾 **Save & reuse templates** — save subject lists per class, reload anytime
- 🏷️ **Optional school name** — appears on the board

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

## How to Use

1. Enter your school name (optional)
2. Pick the date and class
3. Fill in subjects and homework tasks
4. Watch the live preview update
5. Click **Download High-Quality Image**
6. Share the PNG directly to your WhatsApp class group!

### Templates

- Click **Save as Template** to save the current subject list
- Click **Templates** (top right) to load a saved template
- Great for saving standard weekly homework formats per class

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **HTML5 Canvas** (for whiteboard rendering — no external image library needed)
- **localStorage** (for saving templates — no backend required)

## Deployment

Deploy instantly to [Vercel](https://vercel.com):

```bash
npx vercel
```

Or push to GitHub and connect to Vercel for automatic deployments.
# Dairy-app
