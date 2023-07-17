import React, { useCallback, useEffect, useState } from "react";
import { Language } from "../language/lang-utils";
import { Editor } from '@monaco-editor/react';
import { ObjEditor } from "./obj-editor";
import { Select } from "./Select";
import { useCode } from "../language/use-code";

interface Props {
    code?: string;
    onCodeChange?(code: string): void;
    language?: Language;
    onLanguageChange?(lang: Language): void;
}

export function DokEditor({
    code: codeChanged,
    language: languageChanged,
    onCodeChange,
}: Props = {}) {
    const { language, setLanguage, code, setCode } = useCode({
        initialCode: codeChanged,
        initialLanguage: languageChanged,
    });

    useEffect(() => {
        if (codeChanged) {
            setCode(codeChanged);
        }
    }, [codeChanged, setCode]);

    useEffect(() => {
        if (languageChanged) {
            setLanguage(languageChanged);
        }
    }, [languageChanged, setLanguage]);


    const [editor, setEditor] = useState(false);
    const updateCode = useCallback((value?: string) => {
        setCode((code) => {
            if (value && code !== value) {
                setCode(value);
                onCodeChange?.(value);
                return value;
            }
            return code;
        });
    }, [onCodeChange, setCode]);

    return <div>
        <Select setEditor={setEditor} setLanguage={setLanguage} />
        {!editor && <Editor height="80vh" language={language} value={code} onChange={updateCode} />}
        {editor && <ObjEditor code={code} language={language} />}
    </div>;
}