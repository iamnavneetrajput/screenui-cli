import { Command } from 'commander';
import chalk from 'chalk';
import { generateComponent } from './utils/generator';

export function run(argv: string[]): void {
  const program = new Command();

  program
    .name('screenui')
    .description('CLI tool for generating Tailwind-based React components')
    .version('0.1.0');

  program
    .command('add <component>')
    .description('Add a component to your project')
    .option('--lang <language>', 'Language to use (js or ts)', 'ts')
    .option('--path <path>', 'Path to generate the component', './components/ui')
    .action(async (component, options) => {
      const { lang, path } = options;
      
      // Validate language option
      if (lang !== 'js' && lang !== 'ts') {
        console.error(chalk.red('Error: --lang option must be either "js" or "ts"'));
        process.exit(1);
      }

      try {
        await generateComponent(component, lang, path);
        console.log(chalk.green(`✅ Successfully generated ${component} component in ${path}`));
      } catch (error) {
        console.error(chalk.red(`❌ Error generating component: ${error instanceof Error ? error.message : String(error)}`));
        process.exit(1);
      }
    });

  // Display help if no arguments provided
  if (argv.length <= 2) {
    program.help();
  }

  program.parse(argv);
}