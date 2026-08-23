/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Access key do Web3Forms — configure no .env local e na Vercel. */
  readonly VITE_WEB3FORMS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
