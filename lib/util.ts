export function mapDict(dict: Record<any, any>, func: Function) {
  for (const key of Object.keys(dict)) {
    dict[key] = func(key, dict[key]);
  }

  return dict;
}

export type ReactContent = string | JSX.Element;
