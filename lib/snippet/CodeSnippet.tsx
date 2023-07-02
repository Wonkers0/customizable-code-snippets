import useSyntaxHighlighter from "../hooks/useSyntaxIdentifier";
import { createContext, useMemo } from "react";
import useThemeCollection, {
  SyntaxIdentifier,
  ThemeObject,
} from "../hooks/useThemeCollection";
import CodeSnippetConfig from "./CodeSnippetConfig";
import SyntaxRule from "./SyntaxRule";
import useCodeLineRenderer from "../hooks/useCodeLineRenderer";
import styles from "../styles.module.css";
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

export const CodeSnippetContext = createContext<CodeSnippetConfig>(
  new CodeSnippetConfig("js", null, {} as SyntaxRuleRecord).setTheme("dark")
);

export default function CodeSnippet({
  code,
  language,
  className = "",
  id = "",
  themeName = "dark",
  highlightedLinesPattern = "",
  syntaxRules = {} as SyntaxRuleRecord,
}: Props) {
  const highlightedCode = useSyntaxHighlighter(code, language);
  const codeLines = useCodeLineRenderer(highlightedCode, highlightedLinesPattern);
  const codeSnippetConfig = useCodeSnippetConfig(language, themeName, syntaxRules);
  const currentTheme = codeSnippetConfig.getTheme();

  return (
    <pre
      className={`${styles["code-snippet"]} ${className}`}
      id={id}
      style={{
        backgroundColor: currentTheme?.getMemberOrDefault("background", "unset"),
        color: currentTheme?.getMemberOrDefault("default", "unset"),
      }}
    >
      <CodeSnippetContext.Provider value={codeSnippetConfig}>
        {codeLines}
      </CodeSnippetContext.Provider>
    </pre>
  );
}

function useCodeSnippetConfig(
  language: string,
  theme: string | ThemeObject,
  syntaxRules: SyntaxRuleRecord
) {
  const themeCollection = useThemeCollection();

  return useMemo(
    () => new CodeSnippetConfig(language, themeCollection, syntaxRules).setTheme(theme),
    [language, theme, themeCollection, syntaxRules]
  );
}
