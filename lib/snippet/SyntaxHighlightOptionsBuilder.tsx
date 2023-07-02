import { Element, HTMLReactParserOptions } from "html-react-parser";
import { SyntaxIdentifier, Theme } from "../hooks/useThemeCollection";
import { ReactContent } from "../util";
import { applySyntaxRules } from "./SyntaxRule";
import { SyntaxRuleRecord } from "./CodeSnippet";
import React from "react";

export default function buildHighlightOptions(
  currentTheme: Theme,
  syntaxRules: SyntaxRuleRecord
): HTMLReactParserOptions {
  const options = {
    replace: (element: Element) => getReplaceRule(element, currentTheme, syntaxRules),
  } as HTMLReactParserOptions;

  return options;
}

function getReplaceRule(
  element: Element,
  currentTheme: Theme,
  syntaxRules: SyntaxRuleRecord
) {
  const syntaxIdentifier = getSyntaxIdentifierOrNull(element);
  if (!syntaxIdentifier) return null;

  const syntaxColor =
    currentTheme.getColorOfSyntaxIdentifierOrNull(syntaxIdentifier) || "inherit";

  // @ts-ignore
  const children = element.children.map((child) => child.data).join("");
  const parsedChildren = applySyntaxRules(children, syntaxRules, syntaxIdentifier);

  return getHighlightedElement(syntaxIdentifier, syntaxColor, parsedChildren);
}

function getHighlightedElement(
  syntaxIdentifier: any,
  syntaxColor: string,
  parsedChildren: ReactContent | ReactContent[]
) {
  return (
    <span style={{ color: syntaxColor }} data-syntaxidentifier={syntaxIdentifier}>
      {parsedChildren}
    </span>
  );
}

function hasSyntaxIdentifier(element: Element): boolean {
  return element.attribs?.class?.includes("token");
}

function getSyntaxIdentifierOrNull(element: Element): SyntaxIdentifier | null {
  if (!hasSyntaxIdentifier(element)) return null;

  try {
    return element.attribs?.class.split(" ")[1] as SyntaxIdentifier;
  } catch (e) {
    return null;
  }
}
