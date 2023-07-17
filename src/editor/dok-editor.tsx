import React from "react";
import { Language } from "../language/lang-utils";
import { Editor } from '@monaco-editor/react';
import { ObjEditor } from "./obj-editor";


interface Props {
    editor: boolean;
    code: string;
    setCode(code: string): void;
    language: Language;
}

export function DokEditor({ editor, language, code, setCode }: Props) {
    return <div>
        {!editor && <Editor height="80vh" defaultLanguage={language} value={code}
            onChange={value => {
                if (value && code !== value) {
                    setCode(value);
                }
        }} />}
        {editor && <ObjEditor code={code} language={language} />}
    </div>;
}