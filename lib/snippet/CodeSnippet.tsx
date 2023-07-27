import useSyntaxHighlighter from "../hooks/useSyntaxIdentifier";
import { createContext, useMemo } from "react";
import { SyntaxIdentifier, ThemeObject } from "../hooks/useThemeCollection";
import CodeSnippetConfig from "./CodeSnippetConfig";
import SyntaxRule from "./SyntaxRule";
import useCodeLineRenderer from "../hooks/useCodeLineRenderer";
import styles from "../styles.module.css";
import React from "react";

export { default as SyntaxRule } from "./SyntaxRule";

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

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
export type SyntaxRuleRecord = PartialRecord<SyntaxIdentifier, SyntaxRule[]>;

export const CodeSnippetContext = createContext<CodeSnippetConfig>(
  new CodeSnippetConfig("js", {} as SyntaxRuleRecord).setTheme("dark")
);

export default function CodeSnippet({
  code,
  language,
  className = "",
  id = "",
  themeName,
  customTheme,
  highlightedLinesPattern = "",
  syntaxRules = {} as SyntaxRuleRecord,
}: Props) {
  const highlightedCode = useSyntaxHighlighter(code, language);
  const codeLines = useCodeLineRenderer(highlightedCode, highlightedLinesPattern);
  const codeSnippetConfig = useCodeSnippetConfig(
    language,
    getActiveTheme(themeName, customTheme, "dark"),
    syntaxRules
  );
  const currentTheme = codeSnippetConfig.getTheme();

  return (
    <pre
      className={`${styles.codeSnippet} ${className}`}
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
  return useMemo(
    () => new CodeSnippetConfig(language, syntaxRules).setTheme(theme),
    [language, theme, syntaxRules]
  );
}

function getActiveTheme(
  themeName: string | undefined,
  customTheme: ThemeObject | undefined,
  defaultTheme: string | ThemeObject
): string | ThemeObject {
  if (themeName) return themeName;
  if (customTheme) return customTheme;
  return defaultTheme;
}
