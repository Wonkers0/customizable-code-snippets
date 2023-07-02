import { mapDict } from "../util";
import themes from "../themes.json" assert { type: "json" };

export default function useThemeCollection(): ThemeCollection {
  return mapDict(themes, (_: string, themeObject: ThemeObject) =>
    Theme.fromThemeObject(themeObject)
  );
}

export type ThemeCollection = {
  [theme: string]: Theme;
};

export type SyntaxIdentifier = keyof ThemeObject;

export class ThemeObject {
  keyword?: string;
  string?: string;
  number?: string;
  boolean?: string;
  parameter?: string;
  highlight?: string;
  tag?: string;
  comment?: string;
  function?: string;
  background?: string;
  default?: string;
}

export class Theme extends ThemeObject {
  private constructor() {
    super();
  }

  public static fromThemeObject(themeObject: ThemeObject) {
    const theme: Theme = new Theme();
    for (const key of Object.keys(themeObject)) {
      // @ts-ignore
      theme[key] = themeObject[key];
    }

    return theme;
  }

  public getColorOfSyntaxIdentifierOrNull(syntaxIdentifier: keyof this): string | null {
    const memberOfThisInstance = this[syntaxIdentifier];
    const isColorMember = typeof memberOfThisInstance === "string";
    return isColorMember ? memberOfThisInstance : null;
  }

  public getMemberOrDefault(member: keyof this, defaultValue: any) {
    return this[member] ?? defaultValue;
  }
}

function getThemeInstancesFromFetchedThemeData(
  fetchedThemeData: Record<string, ThemeObject>
) {
  return mapDict(fetchedThemeData, (_: string, themeObject: ThemeObject) =>
    Theme.fromThemeObject(themeObject)
  );
}
