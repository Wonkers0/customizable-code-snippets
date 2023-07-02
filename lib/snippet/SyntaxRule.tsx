import React from "react";
import { SyntaxIdentifier } from "../hooks/useThemeCollection";
import { ReactContent } from "../util";
import { SyntaxRuleRecord } from "./CodeSnippet";

type ReplacementCallback = (children: string, id: number) => ReactContent;

export default class SyntaxRule {
  public syntaxMatcher: RegExp;
  public replacement: ReplacementCallback;

  public constructor(regex: string | RegExp, replacement: ReplacementCallback) {
    this.syntaxMatcher = new RegExp(regex);
    this.replacement = replacement;
  }
}

export function applySyntaxRules(
  content: ReactContent | ReactContent[],
  syntaxRuleRecord: SyntaxRuleRecord,
  syntaxIdentifier: SyntaxIdentifier
) {
  const syntaxRules = syntaxRuleRecord[syntaxIdentifier];
  if (syntaxRules == null) return content;

  const contentConvertedToArray = [content].flat();
  syntaxRules.forEach(
    (rule) => (content = applySyntaxRuleToContent(rule, contentConvertedToArray))
  );
  return content;
}

function applySyntaxRuleToContent(
  syntaxRule: SyntaxRule,
  content: ReactContent[]
): ReactContent[] {
  return content
    .map((item, index) => {
      if (typeof item === "string") {
        return applySyntaxRuleToString(syntaxRule, item, index);
      } else return item;
    })
    .flat();
}

function applySyntaxRuleToString(
  syntaxRule: SyntaxRule,
  text: string,
  index: number
): ReactContent[] {
  const { syntaxMatcher, replacement: replacementCallbackFunc } = syntaxRule;
  let result: ReactContent[] = [text];

  const regexMatches = text.match(syntaxMatcher) || [];
  for (const match of regexMatches)
    result = replaceSubstringWithReactContent(
      text,
      match,
      setReplacementKeyIfNone(replacementCallbackFunc, match, index)
    );

  return result;
}

function replaceSubstringWithReactContent(
  str: string,
  substr: string,
  jsx: ReactContent
): ReactContent[] {
  return str
    .split(substr)
    .flatMap((item) => [item, jsx])
    .slice(0, -1);
}

function setReplacementKeyIfNone(
  replacementCallback: ReplacementCallback,
  children: string,
  index: number
): ReactContent {
  const replacement = replacementCallback(children, index);
  if (typeof replacement == "string") return replacement;

  if (replacement.key == null)
    return React.cloneElement(replacement, { key: `${children}_${index}` });
  return replacement;
}
