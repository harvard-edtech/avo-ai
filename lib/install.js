#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import libs
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os_1 = require("os");
const os_2 = require("os");
const console_1 = require("console");
// Import helpers
const prompt_1 = __importDefault(require("./helpers/prompt"));
const print_1 = __importDefault(require("./helpers/print"));
const copyDir_1 = __importDefault(require("./helpers/copyDir"));
// Import constants
const TOP_LEVEL_DIRECTORY_1 = __importDefault(require("./constants/TOP_LEVEL_DIRECTORY"));
// Save prompt instance
print_1.default.savePrompt(prompt_1.default);
/*----------------------------------------*/
/* ------------- Preparation ------------ */
/*----------------------------------------*/
/* -------- Files and Folders ------- */
// Find shared files
const agentSourceFile = path.join(__dirname, '../agent/Avo.agent.md');
// Find copilot files
const copilotAgentDestDir = ((0, os_2.platform)() === 'linux'
    ? path.join((0, os_1.homedir)(), '.config/Code/User/prompts')
    : path.join((0, os_1.homedir)(), 'Library/Application Support/Code/User/prompts'));
const copilotDestFile = path.join(copilotAgentDestDir, 'Avo.agent.md');
// Find claude folder
const claudeSourceDir = path.join(__dirname, '../claude');
// Find Claude Code destination paths (within the project using this tool)
const claudeSettingsSourceDir = path.join(claudeSourceDir, 'dot-claude');
const claudeSettingsDestDir = path.join(TOP_LEVEL_DIRECTORY_1.default, '.claude');
const claudeMdDestFile = path.join(claudeSettingsDestDir, 'CLAUDE.md');
const devContainerSourceDir = path.join(claudeSourceDir, 'dot-devcontainer');
const devContainerDestDir = path.join(TOP_LEVEL_DIRECTORY_1.default, '.devcontainer');
const firewallScriptDestFile = path.join(devContainerDestDir, 'init-firewall.sh');
/* -------------- Intro ------------- */
// Check if dest file exists
const copilotDestFileExists = fs.existsSync(copilotDestFile);
const claudeMdDestFileExists = fs.existsSync(claudeMdDestFile);
const isUpdating = copilotDestFileExists || claudeMdDestFileExists;
// Introduce
(0, console_1.clear)();
print_1.default.title(`${isUpdating ? 'Update' : 'Install'} Avo AI`);
console.log('');
console.log(`This will ${isUpdating ? 'update' : 'install'} Avo AI for this project (GitHub Copilot and Claude Code)`);
console.log('');
print_1.default.enterToContinue();
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
(0, copyDir_1.default)(claudeSettingsSourceDir, claudeSettingsDestDir);
// Copy Avo.agent.md in as .claude/CLAUDE.md
fs.copyFileSync(agentSourceFile, claudeMdDestFile);
// Copy .devcontainer directory contents (dev container + firewall setup)
(0, copyDir_1.default)(devContainerSourceDir, devContainerDestDir);
// Make the firewall script executable
fs.chmodSync(firewallScriptDestFile, 0o755);
/*----------------------------------------*/
/* --------------- Finish --------------- */
/*----------------------------------------*/
// Log success message
(0, console_1.clear)();
print_1.default.title(`Avo AI is ${isUpdating ? 'Updated' : 'Installed'}`);
console.log('');
console.log('Copilot: open VSCode\'s agent panel and select "Avo"');
console.log('Claude: run `claude` in this project and Avo will load automatically');
//# sourceMappingURL=install.js.map