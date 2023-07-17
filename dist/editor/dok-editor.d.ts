import React from "react";
import { Language } from "../language/lang-utils";
interface Props {
    code?: string;
    onCodeChange?(code: string): void;
    language?: Language;
    onLanguageChange?(lang: Language): void;
}
export declare function DokEditor({ code: initialCode, language: initialLanguage, onCodeChange, }?: Props): React.JSX.Element;
export {};
