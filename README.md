ScreenUI CLI
A CLI tool for generating Tailwind-based React components into your project.

Installation
bash
# Clone the repository
git clone https://github.com/yourusername/screenui-cli.git
cd screenui-cli

# Install dependencies
npm install

# Build the project
npm run build

# Link the CLI for local development
npm link
Usage
bash
# Generate a component in the default location (./components/ui)
screenui add button

# Generate a component with a specific language and path
screenui add button --lang js --path src/components/ui

# Get help
screenui --help
Available Components
Currently, the following components are available:

button - A customizable button component with different variants and sizes
card - A card component with header, content, and footer sections
Options
--lang - Language to use (js or ts, default: ts)
--path - Path to generate the component (default: ./components/ui)
Development
Project Structure
├── src/
│   ├── index.ts              # Main CLI entry point
│   ├── cli.ts                # CLI command definitions
│   ├── utils/
│   │   ├── generate.ts       # Component generation logic
│   │   ├── typescript.ts     # TypeScript transformation utilities
│   │   └── fs.ts             # File system utilities
│   └── templates/
│       ├── button.tsx        # Button component template
│       └── card.tsx          # Card component template
Adding New Components
To add a new component template:

Create a new .tsx file in the src/templates directory
The filename will be used as the component name in the CLI
Building
bash
npm run build
License
MIT

