import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import { useMemo } from "react";

export default function useSyntaxIdentifier(code: string, language: string) {
  return useMemo(() => Prism.highlight(code, Prism.languages[language], language), []);
}
