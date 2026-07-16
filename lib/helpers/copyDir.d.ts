/**
 * Recursively copy the contents of a directory into a destination directory,
 *   creating the destination (and any subdirectories) as needed
 * @author Gabe Abrams
 * @param sourceDir directory to copy the contents of
 * @param destDir directory to copy into
 */
declare const copyDir: (sourceDir: string, destDir: string) => void;
export default copyDir;
