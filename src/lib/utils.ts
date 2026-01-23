import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function sanitizeUrl(url?: string): string {
    if (!url) return '';
    const sanitizedUrl = url.trim();
    if (sanitizedUrl.startsWith('javascript:') || sanitizedUrl.startsWith('data:text/html') || sanitizedUrl.startsWith('vbscript:')) {
        return 'about:blank';
    }
    return sanitizedUrl;
}
