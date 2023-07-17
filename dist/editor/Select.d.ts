import React from "react";
import { Language } from "../../dist/language/lang-utils";
interface Props {
    setEditor(value: boolean): void;
    setLanguage(lang: Language): void;
}
export declare function Select({ setEditor, setLanguage }: Props): React.JSX.Element;
export {};
