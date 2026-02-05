# Other World Studios - Landing Page

A beautiful, animated landing page for Other World Studios featuring a rotating planet animation.

## Features

- ✨ Animated planet with rotating rings
- 🌌 Starfield background animation
- 📱 Fully responsive design
- 🎨 Modern gradient styling
- 🖱️ Interactive parallax effects

## Setup

1. **Add your product link:**
   - Open `script.js`
   - Replace `https://example.com/your-product` with your actual product URL

## Deployment to GitHub Pages

### Step 1: Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository** (green button).
3. Name it (e.g. `OWS` or `other-world-studios`).
4. Choose **Public**, leave "Add a README" unchecked if you already have files.
5. Click **Create repository**.

### Step 2: Push your site with Git

From your project folder (`c:\Users\User\Documents\OWS`) in a terminal:

```bash
# Initialize Git (if not already)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Other World Studios landing page"

# Add your repo as remote (replace YOUR_USERNAME and YOUR_REPO with yours)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Rename branch to main and push
git branch -M main
git push -u origin main
```

### Step 3: Turn on GitHub Pages

1. Open your repo on GitHub.
2. Go to **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` → `/ (root)` → **Save**.
4. Wait 1–2 minutes. Your site will be at:
   - **`https://YOUR_USERNAME.github.io/YOUR_REPO/`**

(If the repo is named `YOUR_USERNAME.github.io`, the site is `https://YOUR_USERNAME.github.io`.)

---

## Custom domain (connect your own domain)

### 1. Add domain in GitHub

1. Repo **Settings** → **Pages**.
2. Under **Custom domain**, type your domain (e.g. `otherworldstudios.com` or `www.otherworldstudios.com`).
3. Click **Save**.
4. Optional: check **Enforce HTTPS** after DNS has propagated.

### 2. Configure DNS at your registrar

Log in where you bought the domain (Namecheap, GoDaddy, Cloudflare, Google Domains, etc.) and add one of the following.

**Option A – Root domain (e.g. `otherworldstudios.com`)**

Add **four A records** (replace your root domain with your actual name):

| Type | Name/Host | Value |
|------|-----------|--------|
| A    | `@`       | `185.199.108.153` |
| A    | `@`       | `185.199.109.153` |
| A    | `@`       | `185.199.110.153` |
| A    | `@`       | `185.199.111.153` |

Then in GitHub Pages custom domain, use: `otherworldstudios.com` (no `www`).

**Option B – www subdomain (e.g. `www.otherworldstudios.com`)**

Add **one CNAME record**:

| Type  | Name/Host | Value |
|-------|-----------|--------|
| CNAME | `www`     | `YOUR_USERNAME.github.io` |

In GitHub Pages custom domain, use: `www.otherworldstudios.com`.

**Option C – Both root and www**

- Add the four A records for `@` (as in Option A).
- Add one CNAME: `www` → `YOUR_USERNAME.github.io`.
- In GitHub, set custom domain to your **root** domain (e.g. `otherworldstudios.com`). GitHub will redirect `www` to the root if you use their default behavior, or you can set the custom domain to `www` if you prefer www as primary.

### 3. Wait for DNS

- Propagation usually takes **5 minutes to 48 hours**.
- Check status in **Settings → Pages**: when the domain is verified, the checkbox will show as verified.
- Then enable **Enforce HTTPS** and save.

### 4. Optional: CNAME file for custom domain (legacy)

If you use a **custom domain** (not `*.github.io`), GitHub may ask you to add a `CNAME` file in your repo so the domain sticks:

1. In the repo root, create a file named **`CNAME`** (no extension).
2. Put one line in it: your domain, e.g. `otherworldstudios.com` or `www.otherworldstudios.com`.
3. Commit and push. GitHub Pages will then serve the site from that domain.

## Files Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # Styles and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Customization

- **Colors**: Edit the gradient colors in `styles.css` (search for `linear-gradient`)
- **Planet size**: Adjust the `.planet` width/height in `styles.css`
- **Animation speed**: Modify animation durations in `styles.css`
- **Text content**: Edit the HTML in `index.html`

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge).
