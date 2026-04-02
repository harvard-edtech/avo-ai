"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
/**
 * Execute a command
 * @author Gabe Abrams
 * @param command the command to execute
 * @param printToStdOut if true, print to standard out instead of returning
 */
const exec = (command, printToStdOut) => {
    if (printToStdOut) {
        (0, child_process_1.execSync)(command, { stdio: 'inherit' });
        return '';
    }
    return (0, child_process_1.execSync)(command).toString();
};
exports.default = exec;
//# sourceMappingURL=exec.js.map