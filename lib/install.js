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
// Save prompt instance
print_1.default.savePrompt(prompt_1.default);
// Find files
const sourceFile = path.join(__dirname, '../Avo.agent.md');
const destDir = ((0, os_2.platform)() === 'linux'
    ? path.join((0, os_1.homedir)(), '.config/Code/User/prompts')
    : path.join((0, os_1.homedir)(), 'Library/Application Support/Code/User/prompts'));
const destFile = path.join(destDir, 'Avo.agent.md');
// Check if dest file exists
const destFileExists = fs.existsSync(destFile);
// Introduce
print_1.default.title(`${destFileExists ? 'Update' : 'Install'} Avo AI`);
console.log('');
console.log(`This will ${destFileExists ? 'update' : 'install'} the Avo AI agent in your VS Code prompts directory`);
console.log('');
print_1.default.enterToContinue();
// Create destination directory if it doesn't exist
fs.mkdirSync(destDir, { recursive: true });
// Copy the file
fs.copyFileSync(sourceFile, destFile);
// Log success message
(0, console_1.clear)();
print_1.default.title(`Avo AI ${destFileExists ? 'Updated' : 'Installed'} Successfully`);
console.log('');
console.log('Now, open VSCode\'s agent panel and select "Avo"');
//# sourceMappingURL=install.js.map