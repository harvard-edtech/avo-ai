/**
 * Execute a command
 * @author Gabe Abrams
 * @param command the command to execute
 * @param printToStdOut if true, print to standard out instead of returning
 */
declare const exec: (command: string, printToStdOut?: boolean) => string;
export default exec;
