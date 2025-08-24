import fs from "fs";
import path from "path";

const PROJECT_DIR = path.resolve("src"); // 👈 carpeta donde buscar
const extensions = [".astro", ".md", ".mdx", ".html", ".css"]; // archivos a revisar

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walk(filepath, filelist);
    } else {
      if (extensions.includes(path.extname(filepath))) {
        filelist.push(filepath);
      }
    }
  });
  return filelist;
}

function checkFile(file) {
  const content = fs.readFileSync(file, "utf-8");
  const regex = /(src|href)=["']\/[^"']+/g; // busca src="/..." o href="/..."
  const matches = content.match(regex);
  if (matches) {
    console.log(`⚠️ ${file}`);
    matches.forEach((m) => console.log("   → " + m));
  }
}

function main() {
  console.log("🔍 Buscando rutas absolutas problemáticas en src/ ...\n");
  const files = walk(PROJECT_DIR);
  files.forEach(checkFile);
  console.log("\n✅ Revisión completada.");
}

main();
