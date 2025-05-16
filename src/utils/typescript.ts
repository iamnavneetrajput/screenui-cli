import { Project, ScriptTarget, Node } from 'ts-morph';

/**
 * Transforms TypeScript code to JavaScript by removing types
 * @param tsCode - The TypeScript code to transform
 * @returns The transformed JavaScript code
 */
export async function transformTypeScriptToJavaScript(tsCode: string): Promise<string> {
  // Create an in-memory project
  const project = new Project({
    compilerOptions: {
      target: ScriptTarget.ES2018,
      jsx: 4, // React
    },
    useInMemoryFileSystem: true,
  });

  // Create a source file from the TypeScript code
  const sourceFile = project.createSourceFile('temp.tsx', tsCode);

  // Use ts-morph's built-in emitter to convert TypeScript to JavaScript
  const result = project.emitToMemory();
  const jsFile = result.getFiles().find(file => file.filePath.endsWith('.jsx') || file.filePath.endsWith('.js'));
  
  if (!jsFile) {
    throw new Error('Failed to emit JavaScript file');
  }
  
  return jsFile.text;
}
