"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const print_1 = __importDefault(require("./print"));
const promptSync = (0, prompt_sync_1.default)();
/**
 * Ask the user a question
 * @param title title of the question
 * @param notRequired true if question is not required
 * @returns response
 */
const prompt = (title, notRequired) => {
    const val = promptSync(title);
    if (val === null || (!notRequired && !val)) {
        process.exit(0);
    }
    return val;
};
// Save the prompt for use later
print_1.default.savePrompt(prompt);
exports.default = prompt;
//# sourceMappingURL=prompt.js.map