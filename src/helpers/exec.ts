import { execSync } from 'child_process';

/**
 * Execute a command
 * @author Gabe Abrams
 * @param command the command to execute
 * @param printToStdOut if true, print to standard out instead of returning
 */
const exec = (command: string, printToStdOut?: boolean): string => {
  if (printToStdOut) {
    execSync(command, { stdio: 'inherit' });
    return '';
  }
  return execSync(command).toString();
};

export default exec;