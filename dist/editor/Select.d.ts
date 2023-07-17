import React from "react";
import { Language } from "../language/lang-utils";
interface Props {
    setEditor(value: boolean): void;
    setLanguage(lang: Language): void;
}
export declare function Select({ setEditor, setLanguage }: Props): React.JSX.Element;
export {};
