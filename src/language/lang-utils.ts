import { parse, stringify } from "yaml";

export type Language = 'yaml'|'json'|string;

export function getObject(code: string, lang: 'yaml'|'json'|string) {
    return lang === 'yaml' ? parse(code) : lang === 'json' ? JSON.parse(code): {};
}

export function updateCodeForLanguage(code: string, previousLanguage: string, language: string): string | undefined {
    const obj = getObject(code, previousLanguage);
    const newLang = language;
    if (newLang === 'yaml') {
        return stringify(obj);
    } else if(newLang === 'json') {
        return JSON.stringify(obj, null, "  ") + "\n";
    }
    return;
}
