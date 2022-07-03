import inquirer from "inquirer";
import arg from "arg";
import { createProject } from "./main.js";

/**
 *
 * 1. get user options from terminal
 * 2. if flags are missing, prompt to enter with inquirer
 * 3. deliver the option to createProject function
 */

// case 1
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2), // argv: [node, dir, ...cli argument]
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0], // first argument in cli excluding flag option
    runInstall: args["--install"] || false,
  };
}

// case 2
async function promptForMissingOptions(options) {
  const defaultTemplate = "javascript";
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];

  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose template",
      choices: ["javascript", "typescript"],
      default: defaultTemplate,
    });
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repo?",
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  };
}

export async function cli(args) {
  // 1. user enters a whole command with flags
  let options = parseArgumentsIntoOptions(args);

  // 2. user enters a basic command
  options = await promptForMissingOptions(options);
  console.log(options); // log cli option argument status

  // deliver options to main logic
  await createProject(options);
}

export default cli;
