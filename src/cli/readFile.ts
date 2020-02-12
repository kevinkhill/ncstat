import fs from "fs";

export const readFile = async (filepath: string): Promise<string> => {
  return (await fs.promises.readFile(filepath)).toString();
};
