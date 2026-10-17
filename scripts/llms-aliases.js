// Serves the generated llms.txt at /llms.md and /index.md too: agent
// scanners probe those markdown paths. Runs after `npm run build` (postbuild).
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const llms = fs.readFileSync(path.join(buildDir, 'llms.txt'));

for (const alias of ['llms.md', 'index.md']) {
  const target = path.join(buildDir, alias);
  // Never overwrite a markdown twin the llms plugin wrote for a real page.
  if (fs.existsSync(target)) {
    throw new Error(`build/${alias} already exists; refusing to overwrite it`);
  }
  fs.writeFileSync(target, llms);
}
console.log('[llms-aliases] wrote build/llms.md and build/index.md');
