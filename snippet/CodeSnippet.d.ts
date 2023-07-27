import { SyntaxIdentifier, ThemeObject } from "../hooks/useThemeCollection";
import CodeSnippetConfig from "./CodeSnippetConfig";
import SyntaxRule from "./SyntaxRule";
import React from "react";
interface Props {
    code: string;
    language: string;
    themeName?: string;
    className?: string;
    id?: string;
    customTheme?: ThemeObject;
    highlightedLinesPattern?: string;
    syntaxRules?: SyntaxRuleRecord;
}
export type SyntaxRuleRecord = Record<SyntaxIdentifier, SyntaxRule[]>;
export declare const CodeSnippetContext: React.Context<CodeSnippetConfig>;
export default function CodeSnippet({ code, language, className, id, themeName, customTheme, highlightedLinesPattern, syntaxRules, }: Props): React.JSX.Element;
export {};
