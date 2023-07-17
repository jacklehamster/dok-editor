import { useCallback, useState } from "react";
import { Language, updateCodeForLanguage } from "./lang-utils";

interface Props {
    initialLanguage?: Language;
    initialCode?: string;
}

export function useCode({ initialLanguage = "yaml", initialCode }: Props = {}) {
    const [language, setLanguage] = useState<"yaml"|"json"|string>(initialLanguage);
    const [code, setCode] = useState(initialCode ?? "null");
    return {
        language,
        setLanguage: useCallback((newLang: Language) => {
            setLanguage(oldLanguage => {
                setCode(code => {
                    return updateCodeForLanguage(code, oldLanguage, newLang) ?? "";
                });
                return newLang;
            });
        }, [setCode, setLanguage]),
        code,
        setCode,
    }
}