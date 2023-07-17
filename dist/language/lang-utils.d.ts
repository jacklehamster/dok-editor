export declare type Language = 'yaml' | 'json' | string;
export declare function getObject(code: string, lang: 'yaml' | 'json' | string): any;
export declare function updateCodeForLanguage(code: string, previousLanguage: string, language: string): string | undefined;
