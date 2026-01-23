/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FIRECRAWL_API_KEY: string;
    readonly VITE_SERPER_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
