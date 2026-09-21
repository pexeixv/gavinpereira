/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_CONTACT_ENDPOINT?: string
  readonly VITE_RECAPTCHA_SITE_KEY?: string
  readonly VITE_IMAGEKIT_BASE_URL?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_SEASON_OVERRIDE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.md?raw' {
  const content: string
  export default content
}
