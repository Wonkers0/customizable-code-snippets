import { SyntaxIdentifier } from "../hooks/useThemeCollection";
import { ReactContent } from "../util";
import { SyntaxRuleRecord } from "./CodeSnippet";
type ReplacementCallback = (children: string, id: number) => ReactContent;
export default class SyntaxRule {
    syntaxMatcher: RegExp;
    replacement: ReplacementCallback;
    constructor(regex: string | RegExp, replacement: ReplacementCallback);
}
export declare function applySyntaxRules(content: ReactContent | ReactContent[], syntaxRuleRecord: SyntaxRuleRecord, syntaxIdentifier: SyntaxIdentifier): ReactContent | ReactContent[];
export {};
