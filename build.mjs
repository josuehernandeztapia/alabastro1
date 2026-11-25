// Precompila los .jsx que usa index.html a un solo app.min.js
// y copia React de producción a vendor/. Correr: npm install && npm run build
import fs from 'node:fs';
import Babel from '@babel/standalone';
import { minify } from 'terser';

const html = fs.readFileSync('index.html', 'utf8');
const files = [...html.matchAll(/<!--jsx:([\w.-]+\.jsx)-->/g)].map(m => m[1]);
if (!files.length) throw new Error('No hay marcadores <!--jsx:...--> en index.html');

// Mismas opciones que usa Babel en el navegador para <script type="text/babel">
const parts = files.map(f => {
  const src = fs.readFileSync(f, 'utf8');
  const { code } = Babel.transform(src, { presets: ['env', 'react'], sourceType: 'script', filename: f });
  return `/* ${f} */\n${code}`;
});
const out = await minify(parts.join('\n;\n'), { compress: true, mangle: false, format: { comments: /^\s*[\w-]+\.jsx\s*$/ } });
fs.writeFileSync('app.min.js', out.code);

fs.mkdirSync('vendor', { recursive: true });
fs.copyFileSync('node_modules/react/umd/react.production.min.js', 'vendor/react.production.min.js');
fs.copyFileSync('node_modules/react-dom/umd/react-dom.production.min.js', 'vendor/react-dom.production.min.js');
console.log(`app.min.js: ${files.length} archivos, ${(out.code.length / 1024).toFixed(0)} KB`);
