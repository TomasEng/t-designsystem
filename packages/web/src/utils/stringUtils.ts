export const kebabToCamel = (kebab: string): string => kebab.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());

export const kebabToPascal = (kebab: string): string => kebabToCamel(kebab).replace(/^[a-z]/, (g) => g.toUpperCase());

export const camelToPascal = (camel: string): string => camel.replace(/^[a-z]/, (g) => g.toUpperCase());

export const collapseWhitespace = (text: string): string => text.replace(/\s+/g, " ");

export const trimMargin = (text: string): string => text.trim().replace(/^((?<!\|).)*/gm, "");

export const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export const trimLineBreaks = (text: string): string => text.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
