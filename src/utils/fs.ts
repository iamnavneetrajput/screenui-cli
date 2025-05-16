import fs from 'fs-extra';
import path from 'path';

/**
 * Ensures a directory exists, creating it if necessary
 * @param dir - The directory to ensure exists
 */
export async function ensureDirectory(dir: string): Promise<void> {
  await fs.ensureDir(dir);
}

/**
 * Checks if a file exists
 * @param filePath - The path to the file
 * @returns Whether the file exists
 */
export async function fileExists(filePath: string): Promise<boolean> {
  return fs.pathExists(filePath);
}

/**
 * Reads a file
 * @param filePath - The path to the file
 * @returns The content of the file
 */
export async function readFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf-8');
}

/**
 * Writes content to a file
 * @param filePath - The path to the file
 * @param content - The content to write
 */
export async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.writeFile(filePath, content, 'utf-8');
}

/**
 * Resolves a path relative to the process working directory
 * @param relativePath - The relative path to resolve
 * @returns The absolute path
 */
export function resolvePath(relativePath: string): string {
  return path.resolve(process.cwd(), relativePath);
}