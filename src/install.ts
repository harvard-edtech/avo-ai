#!/usr/bin/env node

// Import libs
import * as fs from 'fs';
import * as path from 'path';
import { homedir } from 'os';
import { platform } from 'os';
import { clear } from 'console';

// Import helpers
import prompt from './helpers/prompt';
import print from './helpers/print';

// Save prompt instance
print.savePrompt(prompt);

// Find files
const sourceFile = path.join(__dirname, '../Avo.agent.md');
const destDir = (
  platform() === 'linux'
    ? path.join(homedir(), '.config/Code/User/prompts')
    : path.join(homedir(), 'Library/Application Support/Code/User/prompts')
);
const destFile = path.join(destDir, 'Avo.agent.md');

// Check if dest file exists
const destFileExists = fs.existsSync(destFile);

// Introduce
print.title(`${destFileExists ? 'Update' : 'Install'} Avo AI`);
console.log('');
console.log(`This will ${destFileExists ? 'update' : 'install'} the Avo AI agent in your VS Code prompts directory`);
console.log('');
print.enterToContinue();

// Create destination directory if it doesn't exist
fs.mkdirSync(destDir, { recursive: true });

// Copy the file
fs.copyFileSync(sourceFile, destFile);

// Log success message
clear();
print.title(`Avo AI ${destFileExists ? 'Updated' : 'Installed'} Successfully`);
console.log('');
console.log('Now, open VSCode\'s agent panel and select "Avo"');
