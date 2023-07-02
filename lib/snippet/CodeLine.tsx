import useHTMLStringParser from "../hooks/useHTMLStringParser";
import buildHighlightOptions from "./SyntaxHighlightOptionsBuilder";
import { Theme } from "../hooks/useThemeCollection";
import { useContext } from "react";
import { CodeSnippetContext, SyntaxRuleRecord } from "./CodeSnippet";
import styles from "../styles.module.css";
import React from "react";

interface Props {
  children: string;
  highlighted: boolean;
}

export default function CodeLine({
  children: highlightedCodeString,
  highlighted,
}: Props) {
  const snippetContext = useContext(CodeSnippetContext);
  const currentTheme = snippetContext.getTheme();

  const parsedCode = parseHighlightedCodeString(
    highlightedCodeString,
    currentTheme,
    snippetContext.syntaxRules
  );
  const lineStyles = getLineStyles(highlighted, currentTheme);

  return (
    <code className={styles["line"]} style={lineStyles}>
      {parsedCode}
    </code>
  );
}

function parseHighlightedCodeString(
  code: string,
  currentTheme: Theme | null,
  syntaxRules: SyntaxRuleRecord
) {
  return useHTMLStringParser(
    code,
    currentTheme ? buildHighlightOptions(currentTheme, syntaxRules) : undefined
  );
}

function getLineStyles(highlighted: boolean, currentTheme: Theme | null) {
  const lineStyles = {};
  const stylesForHighlightedLines = {
    backgroundColor: currentTheme?.getMemberOrDefault(
      "highlight",
      "rgba(255, 255, 255, 0.1)"
    ),
  };

  if (highlighted) Object.assign(lineStyles, stylesForHighlightedLines);

  return lineStyles;
}
