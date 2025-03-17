export function textToURL(text) {
    // Convert text to URL-friendly format
    if (!text) return '';
    
    return text
        .toLowerCase()
        .normalize('NFD')                   // Normalize accented characters
        .replace(/[\u0300-\u036f]/g, '')    // Remove diacritics
        .replace(/[^\w\s-]/g, '')           // Remove special characters
        .replace(/\s+/g, '-')               // Replace spaces with hyphens
        .replace(/-+/g, '-')                // Remove consecutive hyphens
        .trim()                             // Remove whitespace from both ends
        .replace(/^-+|-+$/g, '');           // Remove leading/trailing hyphens
}

export function urlTextToText(text) {
    return text.replace(/-/g, ' ');
}