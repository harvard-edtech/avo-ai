"use strict";
/**
 * The directory of the top-level code
 * @author Gabe Abrams
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Get project directory
let TOP_LEVEL_DIRECTORY = String(process.env.PWD
    || process.env.CWD
    || process.cwd()
    || __dirname);
// Remove part after node_modules if it exists
if (TOP_LEVEL_DIRECTORY.includes('/node_modules')) {
    TOP_LEVEL_DIRECTORY = TOP_LEVEL_DIRECTORY.split('/node_modules')[0];
}
exports.default = TOP_LEVEL_DIRECTORY;
//# sourceMappingURL=TOP_LEVEL_DIRECTORY.js.map