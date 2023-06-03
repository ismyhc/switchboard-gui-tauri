import { execa } from 'execa';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

const origDir = 'src-tauri/binaries-unnamed';
const destDir = 'src-tauri/binaries';

let extension = '';
if (process.platform === 'win32') {
  extension = '.exe';
}

async function main() {
  const rustInfo = (await execa('rustc', ['-vV'])).stdout;
  const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
  if (!targetTriple) {
    console.error('Failed to determine platform target triple');
  }

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  copyFileSync(
    `${origDir}/drivechain-qt-${process.platform}${extension}`,
    `${destDir}/drivechain-qt-${targetTriple}${extension}`
  );

  copyFileSync(
    `${origDir}/bitassets-qt-${process.platform}${extension}`,
    `${destDir}/bitassets-qt-${targetTriple}${extension}`
  );

  copyFileSync(
    `${origDir}/testchain-qt-${process.platform}${extension}`,
    `${destDir}/testchain-qt-${targetTriple}${extension}`
  );
}

main().catch((e) => {
  throw e;
});
