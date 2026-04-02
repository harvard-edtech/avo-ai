"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clear_1 = __importDefault(require("clear"));
// Import shared helpers
const print_1 = __importDefault(require("./print"));
const prompt_1 = __importDefault(require("./prompt"));
/**
 * Show a chooser between many options
 * @author Gabe Abrams
 * @param question the question to ask
 * @param options list of options to choose from
 * @param title main title to show above the choices
 * @param dontClear if true, don't clear the console before
 * @returns chosen option
 */
const showChooser = (opts) => {
    const { question, options, title, dontClear, } = opts;
    // Print the header
    if (!dontClear) {
        (0, clear_1.default)();
    }
    if (title) {
        print_1.default.title(title);
        console.log('');
    }
    print_1.default.subtitle(question);
    // Make sure all options have tags
    let nextNumber = 1;
    const optionsWithTags = options.map((option) => {
        // Get/generate a tag
        let { tag } = option;
        if (!tag) {
            tag = String(nextNumber);
            nextNumber += 1;
        }
        // Return complete option
        return Object.assign(Object.assign({}, option), { tag });
    });
    // Print options
    for (let i = 0; i < optionsWithTags.length; i++) {
        console.log(`${optionsWithTags[i].tag} - ${optionsWithTags[i].description}`);
    }
    // Ask user to choose
    const responseTag = (0, prompt_1.default)('> ').trim();
    // Find the appropriate option
    for (let i = 0; i < optionsWithTags.length; i++) {
        if (responseTag.toLowerCase() === optionsWithTags[i].tag.toLowerCase()) {
            // Found the right option
            return Object.assign(Object.assign({}, optionsWithTags[i]), { index: i });
        }
    }
    // No tag found
    (0, clear_1.default)();
    print_1.default.title('Invalid Choice');
    console.log('');
    print_1.default.enterToContinue();
    return showChooser({
        question,
        options: optionsWithTags,
    });
};
exports.default = showChooser;
//# sourceMappingURL=showChooser.js.map