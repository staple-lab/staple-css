# Deployment Guide

## GitHub Pages Deployment

The documentation site is automatically deployed to GitHub Pages on every push to the `main` branch.

### Setup Instructions

1. **Enable GitHub Pages** in your repository:
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"
   - Save changes

2. **Automatic Deployment**:
   - Push changes to `main` branch
   - GitHub Actions will automatically build and deploy
   - Site will be available at: https://staple-lab.github.io/staple-css/

3. **Manual Deployment**:
   - Go to Actions tab in GitHub
   - Select "Deploy Docs to GitHub Pages" workflow
   - Click "Run workflow" button
   - Select `main` branch and run

### Build Configuration

- **BASE_URL**: Set to `/staple-css/` for proper asset paths
- **Build Command**: `npm run build:docs`
- **Output Directory**: `apps/docs/dist`

### Workflow File

Located at: `.github/workflows/deploy-docs.yml`

The workflow:
1. Checks out the repository
2. Sets up Node.js 24 with npm caching
3. Installs dependencies with `npm ci`
4. Builds packages (@staple-css/tokens and @staple-css/primitives)
5. Builds docs with BASE_URL=/staple-css/
6. Uploads build artifacts
7. Deploys to GitHub Pages

### SPA Routing

The site includes a `404.html` file that handles client-side routing for the React SPA. When a user navigates directly to a route (e.g., `/staple-css/primitives`), GitHub Pages serves the 404.html which:
1. Stores the requested path in sessionStorage
2. Redirects to index.html
3. index.html reads the stored path and navigates to it

### Troubleshooting

**Assets not loading:**
- Verify BASE_URL is set correctly in the workflow
- Check that paths in built files start with `/staple-css/`

**Routes return 404:**
- Ensure 404.html is in the `public` folder
- Verify the redirect URL in 404.html matches your BASE_URL

**Build fails:**
- Check that all packages build successfully locally
- Run `npm run build:packages && npm run build:docs` locally
- Check workflow logs in GitHub Actions tab

### Local Testing

Test the production build locally:

```bash
# Build with production settings
BASE_URL=/staple-css/ npm run build:packages && npm run build:docs

# Serve the build locally
npx serve apps/docs/dist -p 3000

# Visit http://localhost:3000/staple-css/
```
