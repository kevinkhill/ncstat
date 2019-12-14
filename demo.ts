import path from "path";
import { Program } from './src';

(async () => {
  const filepath = path.join(__dirname, "../nc/example2.NC");

  const program = Program.createFromFile(filepath);
  const deepestZ = await program.deepestZ();

  console.log(`Deepest Z = ${deepestZ}`);
})();
