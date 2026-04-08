import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project sites live at https://<user>.github.io/<repo>/
// GITHUB_REPOSITORY and GITHUB_PAGES are set in CI; locally base stays "/".
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base =
  process.env.GITHUB_PAGES === 'true' && repo ? `/${repo}/` : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
