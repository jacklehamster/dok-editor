import React, { useMemo, useState } from "react";
import { Language } from "../../dist/language/lang-utils";

interface Props {
    setEditor(value: boolean): void;
    setLanguage(lang: Language): void;
}

type Options = "yaml"|"json"|"editor"|string;

export function Select({ setEditor, setLanguage }: Props) {
    const [option, setOption] = useState<Options>("yaml");
    const options = useMemo(() => ({
        "yaml": (option: Options) => {
            setEditor(false); setLanguage(option);
            setOption(option);
        },
        "json": (option: Options) => {
            setEditor(false); setLanguage(option);
            setOption(option);
        },
        "editor": (option: Options) => {
            setEditor(true);
            setOption(option);
        },
    }), [setEditor, setLanguage]);

    return <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        {Object.entries(options).map(([key, action]) => {
            const selected = key === option;
            return <div key={key} 
                style={{
                    margin: 5,
                    padding: 5,
                    backgroundColor: selected ? "black" : undefined,
                    color: selected ? "snow" : "blue",
                    cursor: selected ? undefined : "pointer",
                }}
                onClick={() => action(key)}>{key}</div>;
        })}
    </div>
}