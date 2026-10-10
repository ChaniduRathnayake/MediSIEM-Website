/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  /** Production origin, e.g. https://medisiem.lk (see src/seo/siteUrl.ts). */
  readonly VITE_SITE_URL?: string
  /** Plausible Analytics site domain; analytics stay off when unset. */
  readonly VITE_PLAUSIBLE_DOMAIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
