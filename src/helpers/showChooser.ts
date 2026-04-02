import clear from 'clear';

// Import shared helpers
import print from './print';
import prompt from './prompt';

// Import shared types
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
const showChooser = (
  opts: {
    question: string,
    options: ChooserOption[],
    title?: string,
    dontClear?: boolean,
  },
): {
  description: string,
  tag: string,
  index: number,
} => {
  const {
    question,
    options,
    title,
    dontClear,
  } = opts;

  // Print the header
  if (!dontClear) {
    clear();
  }
  if (title) {
    print.title(title);
    console.log('');
  }
  print.subtitle(question);

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
    return {
      ...option,
      tag,
    };
  });

  // Print options
  for (let i = 0; i < optionsWithTags.length; i++) {
    console.log(`${optionsWithTags[i].tag} - ${optionsWithTags[i].description}`);
  }

  // Ask user to choose
  const responseTag = prompt('> ').trim();

  // Find the appropriate option
  for (let i = 0; i < optionsWithTags.length; i++) {
    if (responseTag.toLowerCase() === optionsWithTags[i].tag.toLowerCase()) {
      // Found the right option
      return {
        ...optionsWithTags[i],
        index: i,
      };
    }
  }

  // No tag found
  clear();
  print.title('Invalid Choice');
  console.log('');
  print.enterToContinue();
  return showChooser({
    question,
    options: optionsWithTags,
  });
};

export default showChooser;
