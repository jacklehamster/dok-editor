/// <reference types="react" />
import { Language } from "./lang-utils";
interface Props {
    initialLanguage?: Language;
    initialCode?: string;
}
export declare function useCode({ initialLanguage, initialCode }?: Props): {
    language: string;
    setLanguage: (newLang: Language) => void;
    code: string;
    setCode: import("react").Dispatch<import("react").SetStateAction<string>>;
};
export {};
