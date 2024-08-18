export const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace all non-alphanumeric characters with hyphens
        .replace(/(^-|-$)/g, '') // Remove leading and trailing hyphens
        .replace(/[^\w\s]/gi, '') // Remove all special characters
};
