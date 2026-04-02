import * as fs from 'fs';
import * as path from 'path';
import { homedir } from 'os';
import { platform } from 'os';

// Find files
const sourceFile = path.join(process.cwd(), 'Avo.agent.md');
const destDir = (
  platform() === 'linux'
    ? path.join(homedir(), '.config/Code/User/prompts')
    : path.join(homedir(), 'Library/Application Support/Code/User/prompts')
);
const destFile = path.join(destDir, 'Avo.agent.md');

// Create destination directory if it doesn't exist
fs.mkdirSync(destDir, { recursive: true });

// Copy the file
fs.copyFileSync(sourceFile, destFile);

// Log success message
console.log(`Created/updated Avo.agent.md in ${destDir}`);
