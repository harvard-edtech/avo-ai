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
import copyDir from './helpers/copyDir';

// Import constants
import TOP_LEVEL_DIRECTORY from './constants/TOP_LEVEL_DIRECTORY';

// Save prompt instance
print.savePrompt(prompt);

/*----------------------------------------*/
/* ------------- Preparation ------------ */
/*----------------------------------------*/

/* -------- Files and Folders ------- */

// Find shared files
const agentSourceFile = path.join(__dirname, '../agent/Avo.agent.md');

// Find copilot files
const copilotAgentDestDir = (
  platform() === 'linux'
    ? path.join(homedir(), '.config/Code/User/prompts')
    : path.join(homedir(), 'Library/Application Support/Code/User/prompts')
);
const copilotDestFile = path.join(copilotAgentDestDir, 'Avo.agent.md');

// Find claude folder
const claudeSourceDir = path.join(__dirname, '../claude');

// Find Claude Code destination paths (within the project using this tool)
const claudeSettingsSourceDir = path.join(claudeSourceDir, 'dot-claude');
const claudeSettingsDestDir = path.join(TOP_LEVEL_DIRECTORY, '.claude');
const claudeMdDestFile = path.join(claudeSettingsDestDir, 'CLAUDE.md');
const devContainerSourceDir = path.join(claudeSourceDir, 'dot-devcontainer');
const devContainerDestDir = path.join(TOP_LEVEL_DIRECTORY, '.devcontainer');
const firewallScriptDestFile = path.join(devContainerDestDir, 'init-firewall.sh');

/* -------------- Intro ------------- */

// Check if dest file exists
const copilotDestFileExists = fs.existsSync(copilotDestFile);
const claudeMdDestFileExists = fs.existsSync(claudeMdDestFile);
const isUpdating = copilotDestFileExists || claudeMdDestFileExists;

// Introduce
clear();
print.title(`${isUpdating ? 'Update' : 'Install'} Avo AI`);
console.log('');
console.log(`This will ${isUpdating ? 'update' : 'install'} Avo AI for this project (GitHub Copilot and Claude Code)`);
console.log('');
print.enterToContinue();

/*----------------------------------------*/
/* ------------ Copilot Setup ----------- */
/*----------------------------------------*/

// Create destination directory if it doesn't exist
fs.mkdirSync(copilotAgentDestDir, { recursive: true });

// Copy the file
fs.copyFileSync(agentSourceFile, copilotDestFile);

/*----------------------------------------*/
/* ------------- Claude Code ------------ */
/*----------------------------------------*/

// Copy .claude directory contents (project settings, permissions, etc.)
copyDir(claudeSettingsSourceDir, claudeSettingsDestDir);

// Copy Avo.agent.md in as .claude/CLAUDE.md
fs.copyFileSync(agentSourceFile, claudeMdDestFile);

// Copy .devcontainer directory contents (dev container + firewall setup)
copyDir(devContainerSourceDir, devContainerDestDir);

// Make the firewall script executable
fs.chmodSync(firewallScriptDestFile, 0o755);

/*----------------------------------------*/
/* --------------- Finish --------------- */
/*----------------------------------------*/

// Log success message
clear();
print.title(`Avo AI is ${isUpdating ? 'Updated' : 'Installed'}`);
console.log('');
console.log('Copilot: open VSCode\'s agent panel and select "Avo"');
console.log('Claude: run `claude` in this project and Avo will load automatically');
