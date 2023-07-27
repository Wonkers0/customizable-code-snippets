import { HTMLReactParserOptions } from "html-react-parser";
import { Theme } from "../hooks/useThemeCollection";
import { SyntaxRuleRecord } from "./CodeSnippet";
export default function buildHighlightOptions(currentTheme: Theme, syntaxRules: SyntaxRuleRecord): HTMLReactParserOptions;
