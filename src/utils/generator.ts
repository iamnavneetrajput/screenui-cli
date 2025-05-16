import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import chalk from 'chalk';
import { transformTypeScriptToJavaScript } from './typescript';

/**
 * Generates a component based on the specified template
 * @param componentName - The name of the component to generate
 * @param language - The language to use (js or ts)
 * @param outputPath - The directory to output the component to
 */
export async function generateComponent(
  componentName: string,
  language: 'js' | 'ts',
  outputPath: string
): Promise<void> {
  const spinner = ora(`Generating ${componentName} component`).start();
  
  try {
    // Check if component template exists
    const templatePath = path.resolve(__dirname, '..', '..', 'src', 'templates', `${componentName}.tsx`);
    
    if (!await fs.pathExists(templatePath)) {
      spinner.fail();
      throw new Error(`Component template for "${componentName}" does not exist`);
    }
    
    // Read the template content
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    
    // Create the output directory if it doesn't exist
    await fs.ensureDir(outputPath);
    
    // Generate the output file path
    const extension = language === 'ts' ? '.tsx' : '.jsx';
    const fileName = `${componentName}${extension}`;
    const outputFilePath = path.join(outputPath, fileName);
    
    // Check if the file already exists
    if (await fs.pathExists(outputFilePath)) {
      spinner.warn();
      const overwrite = await promptForOverwrite(outputFilePath);
      
      if (!overwrite) {
        spinner.fail(`Generation canceled: ${outputFilePath} already exists`);
        return;
      }
    }
    
    // Process the template based on the language
    let processedContent: string;
    
    if (language === 'ts') {
      // For TypeScript, use the template as-is
      processedContent = templateContent;
    } else {
      // For JavaScript, convert TypeScript to JavaScript
      processedContent = await transformTypeScriptToJavaScript(templateContent);
    }
    
    // Write the processed content to the output file
    await fs.writeFile(outputFilePath, processedContent, 'utf-8');
    
    spinner.succeed(`Component ${componentName} generated at ${outputFilePath}`);
  } catch (error) {
    spinner.fail();
    throw error;
  }
}

// This is a placeholder for a prompt function
// In a real implementation, you'd use a library like inquirer
async function promptForOverwrite(filePath: string): Promise<boolean> {
  // For now, we'll just log a message and return true
  console.log(chalk.yellow(`Warning: ${filePath} already exists. Overwriting.`));
  return true;
}