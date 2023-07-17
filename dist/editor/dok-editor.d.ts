import React from "react";
import { Language } from "../language/lang-utils";
interface Props {
    code?: string;
    onCodeChange?(code: string): void;
    language?: Language;
    onLanguageChange?(lang: Language): void;
}
export declare function DokEditor({ code: codeChanged, language: languageChanged, onCodeChange, onLanguageChange, }?: Props): React.JSX.Element;
export {};
