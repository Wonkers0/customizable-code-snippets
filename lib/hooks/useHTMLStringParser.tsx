import { useMemo } from "react";
import parse, { HTMLReactParserOptions } from "html-react-parser";

type returnType = string | React.ReactNode | React.ReactNode[];

export default function useHTMLStringParser(
  htmlString: string,
  options?: HTMLReactParserOptions
): returnType {
  return useMemo(() => parse(htmlString, options), [htmlString, options]);
}
