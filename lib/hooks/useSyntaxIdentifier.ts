import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import { useMemo } from "react";

export default function useSyntaxIdentifier(code: string, language: string) {
  return useMemo(
    () =>
      deserializeCode(
        Prism.highlight(serializeCode(code), Prism.languages[language], language)
      ),
    []
  );
}

// Prism strips markup from the code which is extremely annoying
function serializeCode(code: string): string {
  return code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function deserializeCode(code: string): string {
  return code.replace(/&lt;/g, "<").replace(/&gt;g/, ">");
}
