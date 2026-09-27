import { MTEditorSmilies } from "../forum-post/MTEditorSmilies";

export const MTSmiliesDict = () => {
  const smiliesList = MTEditorSmilies();
  const smiliesDict = {} as {
    [key: string]: string;
  };
  smiliesList.forEach((smile) => {
    for (const key in smile) {
      if (!Reflect.has(smile, key)) continue;
      const value = smile[key as keyof typeof smile];
      if (typeof value === "string") {
        Reflect.set(smiliesDict, key, value);
      }
    }
  });
  return smiliesDict;
};
