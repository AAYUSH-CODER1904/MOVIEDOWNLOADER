# CineGate — Direct Cinema Link Gateway Landing Page

A **100% free, serverless, mobile-first cinematic dark landing page** engineered for viral traffic from **Instagram Reels** and **YouTube Shorts**. 

Visitors click the "Link in Bio" on social platforms, enter the **Post Code** (e.g. `#101`, `#102`, `#104`) from the video, and instantly unlock direct **4K UHD**, **2K QHD**, **1080p FHD**, and **720p HD** download mirrors scraped by **NinjaBot**.

---

## 🌟 Key Features

1. **Stitch Dark Glassmorphism UI**: High-impact theater aesthetic using Tailwind CSS, Geist & Inter typography, and Material Symbols.
2. **Instant Code Unlock**: Visitors enter `#101` or search by movie title to view the full movie card and download mirrors.
3. **Deep Linking / URL Routing**: Direct bio links formatted as `https://aayush-coder1904.github.io/MOVIEDOWNLOADER/?code=101` automatically open the unlocked movie modal without requiring manual typing!
4. **Permanent Mirrors**: Direct download buttons for 4K UHD, 2K QHD, 1080p BluRay, and 720p mobile resolutions.
5. **Zero Backend Required**: Runs on static JSON (`catalog.json`) on **GitHub Pages** or **Cloudflare Pages** with zero hosting costs.

---

## 📁 File Structure

```text
web/
├── index.html        # Main landing page & modal container
├── styles.css        # Custom keyframe animations (shake, slideUp, pulseGlow)
├── app.js            # Dynamic catalog loader, validation, deep-linker & modal renderer
├── catalog.json      # JSON database of movies, post codes, and download links
└── README.md         # Documentation
```

---

## 🚀 Live Deployment (GitHub Pages)

This landing page repository is hosted at:
- **Repository**: [https://github.com/AAYUSH-CODER1904/MOVIEDOWNLOADER](https://github.com/AAYUSH-CODER1904/MOVIEDOWNLOADER)
- **Live URL**: `https://aayush-coder1904.github.io/MOVIEDOWNLOADER/`

To enable GitHub Pages:
1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Branch**, select `main` / `root`.
3. Save. The site is live within 60 seconds!
