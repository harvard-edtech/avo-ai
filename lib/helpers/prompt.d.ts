/**
 * Ask the user a question
 * @param title title of the question
 * @param notRequired true if question is not required
 * @returns response
 */
declare const prompt: (title: string, notRequired?: boolean) => string;
export default prompt;
