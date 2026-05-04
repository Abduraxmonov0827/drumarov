import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const SKIP_DIR_NAMES = new Set(["node_modules", ".next", "generated", ".git"]);

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIR_NAMES.has(ent.name)) continue;
      walk(p, acc);
    } else {
      acc.push(p);
    }
  }
  return acc;
}

function isGenerated(filePath) {
  return filePath.replace(/\\/g, "/").includes("/generated/");
}

function stripTsLike(filePath, text) {
  const kind = filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true, kind);
  const printer = ts.createPrinter({
    removeComments: true,
    newLine: ts.NewLineKind.LineFeed,
  });
  let out = printer.printFile(sf);
  if (!out.endsWith("\n")) out += "\n";
  return out;
}

function stripCss(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, "");
}

function processRoots() {
  const dirs = [
    path.join(root, "src"),
    path.join(root, "prisma"),
    path.join(root, "scripts"),
  ];
  const extraFiles = [
    path.join(root, "next.config.ts"),
    path.join(root, "next.config.mjs"),
    path.join(root, "eslint.config.mjs"),
    path.join(root, "postcss.config.mjs"),
    path.join(root, "postcss.config.cjs"),
  ];

  let tsCount = 0;
  let cssCount = 0;
  let jsConfigCount = 0;

  for (const dir of dirs) {
    for (const filePath of walk(dir)) {
      if (isGenerated(filePath)) continue;
      if (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) {
        const text = fs.readFileSync(filePath, "utf8");
        fs.writeFileSync(filePath, stripTsLike(filePath, text));
        tsCount++;
      } else if (filePath.endsWith(".css")) {
        const text = fs.readFileSync(filePath, "utf8");
        fs.writeFileSync(filePath, stripCss(text));
        cssCount++;
      }
    }
  }

  for (const filePath of extraFiles) {
    if (!fs.existsSync(filePath)) continue;
    if (filePath.endsWith(".ts")) {
      const text = fs.readFileSync(filePath, "utf8");
      fs.writeFileSync(filePath, stripTsLike(filePath, text));
      tsCount++;
    } else if (filePath.endsWith(".mjs") || filePath.endsWith(".cjs")) {
      let text = fs.readFileSync(filePath, "utf8");
      text = text.replace(/\/\*[\s\S]*?\*\//g, "");
      text = text.replace(/(?:^|\n)\s*\/\/[^\n]*/g, "\n");
      fs.writeFileSync(filePath, text.replace(/\n{3,}/g, "\n\n").trimEnd() + "\n");
      jsConfigCount++;
    }
  }

  console.log(`Stripped TS/TSX: ${tsCount}, CSS: ${cssCount}, config JS: ${jsConfigCount}`);
}

processRoots();
