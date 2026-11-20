# Akshit Mehta — Portfolio & Technical Showcase

[![Status](https://img.shields.io/badge/Status-Production%20Ready-emerald.svg)](#)
[![Stack](https://img.shields.io/badge/Stack-Full--Stack%20%7C%20Data%20Science%20%7C%20AI-sky.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#)

> **Senior Full-Stack Engineer & Data Scientist**  
> Turning complex data into actionable machine learning pipelines and architecting resilient web applications.

---

## 🌟 Highlights & Key Features

1. **High-Performance Architecture**: Zero-bloat, lightning fast initial paint, optimized for 100/100 Lighthouse performance metrics.
2. **Interactive Senior Developer CLI**: Embedded browser terminal supporting interactive commands (`help`, `skills`, `projects`, `stats`, `contact`, `sudo hire`).
3. **Dynamic Project Matrix with Filter Tabs**: Seamless categorization across Machine Learning, Data Analytics & EDA, Full-Stack Web, and Systems / Game Dev.
4. **Project Deep-Dive Modals**: Technical architecture breakdown, system data flows, key engineering features, and direct source repository links for all 7 projects.
5. **Direct Connect & Toast Notifications**: Working contact form integration, one-click email copy with animated feedback, and instant response pledge.
6. **Deploy-Ready**: Pre-configured CI/CD for **GitHub Pages** (`.github/workflows/deploy.yml`) and **Vercel** (`vercel.json`).

---

## 📁 Repository Structure

```text
├── index.html                 # Production entrypoint with semantic HTML5 & Tailwind
├── vercel.json                # Vercel deployment and security header configuration
├── package.json               # NPM scripts and project metadata
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions automated Pages deployment workflow
├── assets/
│   ├── css/
│   │   └── styles.css         # Custom animations, glow effects, terminal styles
│   └── js/
│       ├── main.js            # Reactive terminal, filtering, modals, form handlers
│       └── projects-data.js   # Rich metadata, architecture diagrams, and metrics
└── README.md                  # Documentation and deployment instructions
```

---

## 🚀 Local Preview

You can start a local development server using either Node or Python:

### Option A: Using Python (Built-in)
```bash
python3 -m http.server 3000
```
Then navigate to: `http://localhost:3000`

### Option B: Using Node
```bash
npx serve . -l 3000
```

---

## 🌐 Instant Cloud Deployment

### 1. GitHub Pages (Automated via GitHub Actions)
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: complete senior portfolio deployment"
   ```
2. Push to your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/Mehtaji2004/<repo-name>.git
   git push -u origin main
   ```
3. Go to **Settings** > **Pages** in your GitHub repository and set **Source** to **GitHub Actions**. The included `.github/workflows/deploy.yml` workflow will automatically build and deploy the site!

### 2. Vercel (Instant 1-Click)
Run in the terminal:
```bash
npx vercel
```
Or import the repository directly on [vercel.com](https://vercel.com). The included `vercel.json` ensures zero-config instant deployment.

---

## 📬 Contact
- **Email**: [mehtaakshit65@gmail.com](mailto:mehtaakshit65@gmail.com)
- **GitHub**: [@Mehtaji2004](https://github.com/Mehtaji2004)
