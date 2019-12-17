import { NcFile } from "./src/NcFile";
import { getTestNcFile } from "./tests/helpers";

(async () => {
  const filepath = getTestNcFile("example2.NC");

  const ncfile = await NcFile.createFromPath(filepath);
  const deepestZ = await ncfile.getDeepestZ();

  console.log(`Deepest Z = ${deepestZ}`);
})();
