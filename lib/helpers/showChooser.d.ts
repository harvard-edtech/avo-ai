import ChooserOption from '../types/ChooserOption';
/**
 * Show a chooser between many options
 * @author Gabe Abrams
 * @param question the question to ask
 * @param options list of options to choose from
 * @param title main title to show above the choices
 * @param dontClear if true, don't clear the console before
 * @returns chosen option
 */
declare const showChooser: (opts: {
    question: string;
    options: ChooserOption[];
    title?: string;
    dontClear?: boolean;
}) => {
    description: string;
    tag: string;
    index: number;
};
export default showChooser;
