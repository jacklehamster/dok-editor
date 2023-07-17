import React from "react";
import { Language } from "../language/lang-utils";
interface Props {
    editor: boolean;
    code: string;
    setCode(code: string): void;
    language: Language;
}
export declare function DokEditor({ editor, language, code, setCode }: Props): React.JSX.Element;
export {};
