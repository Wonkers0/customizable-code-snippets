import useThemeCollection, {
  Theme,
  ThemeCollection,
  ThemeObject,
} from "../hooks/useThemeCollection";
import { SyntaxRuleRecord } from "./CodeSnippet";

export default class CodeSnippetConfig {
  language: string;
  themeID?: string;
  customTheme?: Theme;
  syntaxRules: SyntaxRuleRecord;
  themeCollection: ThemeCollection = useThemeCollection();

  constructor(language: string, syntaxRules: SyntaxRuleRecord) {
    this.language = language;
    this.syntaxRules = syntaxRules;
  }

  public setTheme(theme: string | ThemeObject): CodeSnippetConfig {
    if (typeof theme === "string") this.themeID = theme;
    else this.customTheme = Theme.fromThemeObject(theme);

    return this;
  }

  public getTheme(): Theme | null {
    if (this.themeID != null) return this.getThemeFromCollection();
    else if (this.customTheme != null) return this.getCustomTheme();
    else return null;
  }

  private getThemeFromCollection() {
    if (!this.themeCollection || !this.themeID) return null;
    return this.themeCollection[this.themeID];
  }

  private getCustomTheme(): Theme | null {
    return this.customTheme ?? null;
  }
}
