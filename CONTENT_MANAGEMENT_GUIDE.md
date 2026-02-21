# Portfolio Content Management Workflow

This document outlines the step-by-step process for updating your portfolio content, managing projects via the CMS, and updating your resume after a hard reboot or when returning to development.

## 1. Starting the Environment (From a Hard Reboot)

Whenever you restart your computer or want to work on the site locally, follow these steps to spin everything back up:

1. **Open your Terminal / VS Code** and ensure you are in the `portfolio` directory:
   ```bash
   cd c:\Users\Kingsley\Documents\PortfolioWebsite\portfolio
   ```
2. **Start the Next.js Development Server**:
   ```bash
   npm run dev
   ```
3. **Open your Browser**:
   - Main Site: `http://localhost:3000`
   - Sanity Studio (CMS): `http://localhost:3000/studio`

*(Note: If port 3000 is occupied, Next.js might start on 3001, 3005, etc. Check the terminal output for the exact local URL).*

---

## 2. Managing Projects (Sanity CMS)

Your portfolio is connected to a headless CMS (Sanity). All textual project data, specifications, and images are managed here instead of hardcoded into the React files.

### Accessing the Studio
Navigate to `http://localhost:3000/studio` and log in with the same account you used to create the Sanity project.

### Adding a New Project
1. In the Studio sidebar, click on **Projects**.
2. Click the **Pencil icon** (Create new document) in the top right of the list.
3. Fill out the corresponding fields:
   - **Title**: The name of the project.
   - **Slug**: Click "Generate" to automatically create the URL slug from the title.
   - **Date**: Used sequentially to order the horizontal timeline.
   - **Main Image**: The primary backdrop image for the project card.
   - **Interactive Media URLs**: Paste external image links or video URLs for the "What, How, Results" interactive tabs.
   - **Specifications**: Add 3 core metric blocks (e.g., `Label: "PPM"`, `Value: "180"`).
   - **Detailed Content**: The "Challenge, Approach, Impact" textual breakdown.
4. Click **Publish** in the bottom right corner. The website will instantly and automatically pull this new project into the horizontal scrolling tape on your live site!

---

## 3. Updating Your Resume (PDF)

If you have a downloadable static Resume (e.g., a PDF file) that you want to host on the site, bypass Sanity and manage it directly in the static assets folder.

1. Ensure your resume file is named `resume.pdf` (or similar).
2. Place the file inside the `portfolio/public/` directory:
   ```text
   portfolio/
   └── public/
       └── resume.pdf
   ```
3. Any file placed in the `public/` directory is automatically served at the root URL of your website.
4. You can now link to it anywhere in your code (or give it to employers) as: `https://kingsleyfong.com/resume.pdf` (or `http://localhost:3000/resume.pdf` locally).

---

## 4. Deploying Updates to Live (Vercel)

Since your code lives on GitHub and is hosted on Vercel, your deployment pipeline is completely automated.

1. **CMS Content Changes** (Changing text, images, adding projects in Sanity): 
   - No code push required! The moment you hit "Publish" in Sanity Studio, your live website at `kingsleyfong.com` fetches the new data instantly.
   
2. **Codebase Changes** (Updating layout styles, adding new React components, or replacing `resume.pdf` in the `/public` folder):
   - You must commit and push your code to GitHub.
   ```bash
   git add .
   git commit -m "Updated resume and tweaked layout"
   git push origin main
   ```
   - Vercel will automatically detect the push to the `main` branch, build the new version of your site, and deploy it to `kingsleyfong.com` within a minute or two.
