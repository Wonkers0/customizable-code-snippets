import React from "react";
interface Props {
    children: string;
    highlighted: boolean;
}
export default function CodeLine({ children: highlightedCodeString, highlighted, }: Props): React.JSX.Element;
export {};
