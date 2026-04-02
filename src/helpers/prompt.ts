import initPrompt from 'prompt-sync';
import print from './print';

const promptSync = initPrompt();

/**
 * Ask the user a question
 * @param title title of the question
 * @param notRequired true if question is not required
 * @returns response
 */
const prompt = (title: string, notRequired?: boolean): string => {
  const val = promptSync(title);
  if (val === null || (!notRequired && !val)) {
    process.exit(0);
  }
  return val;
};

// Save the prompt for use later
print.savePrompt(prompt);

export default prompt;
