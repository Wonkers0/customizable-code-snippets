import { Theme, ThemeCollection, ThemeObject } from "../hooks/useThemeCollection";
import { SyntaxRuleRecord } from "./CodeSnippet";
export default class CodeSnippetConfig {
    language: string;
    themeID?: string;
    customTheme?: Theme;
    syntaxRules: SyntaxRuleRecord;
    themeCollection: ThemeCollection;
    constructor(language: string, syntaxRules: SyntaxRuleRecord);
    setTheme(theme: string | ThemeObject): CodeSnippetConfig;
    getTheme(): Theme | null;
    private getThemeFromCollection;
    private getCustomTheme;
}
