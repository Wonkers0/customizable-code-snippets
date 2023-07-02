import { useMemo } from "react";
import CodeLine from "../snippet/CodeLine";
import React from "react";

export default function useCodeLineRenderer(
  highlightedCode: string,
  highlightedLinesPattern: string
) {
  return useMemo(() => {
    const codeLines = highlightedCode.split("\n");
    const indiciesOfHighlightedLines = getHighlightedLinesIndices(highlightedLinesPattern); // prettier-ignore

    return renderCodeLines(codeLines, indiciesOfHighlightedLines);
  }, [highlightedCode, highlightedLinesPattern]);
}

function renderCodeLines(codeLines: string[], indiciesOfHighlightedLines: number[]) {
  return codeLines.map((codeLine: string, i: number) =>
    renderCodeLine(
      codeLine,
      `${codeLine}_${i}`,
      indiciesOfHighlightedLines.includes(i + 1)
    )
  );
}

function renderCodeLine(
  codeLineContent: string,
  key: string,
  highlighted: boolean
): JSX.Element {
  return (
    <CodeLine
      key={key}
      highlighted={highlighted}
      // +1 because line numbers start at 1, rather than 0 👆 (like array indices)
    >
      {codeLineContent}
    </CodeLine>
  );
}

function getHighlightedLinesIndices(highlightedLinesPattern: string): number[] {
  const ranges = highlightedLinesPattern.split(",").map((range) => range.split("-"));
  const indices: number[] = [];

  for (const range of ranges) {
    if (range.length == 2) {
      for (let i = parseInt(range[0]); i <= parseInt(range[1]); i++) {
        indices.push(i);
      }
    } else {
      indices.push(parseInt(range[0]));
    }
  }

  return indices;
}
