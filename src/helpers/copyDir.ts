import * as fs from 'fs';
import * as path from 'path';

/**
 * Recursively copy the contents of a directory into a destination directory,
 *   creating the destination (and any subdirectories) as needed
 * @author Gabe Abrams
 * @param sourceDir directory to copy the contents of
 * @param destDir directory to copy into
 */
const copyDir = (sourceDir: string, destDir: string) => {
  fs.mkdirSync(destDir, { recursive: true });

  fs.readdirSync(sourceDir, { withFileTypes: true }).forEach((entry) => {
    const sourcePath = path.join(sourceDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDir(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
};

export default copyDir;
