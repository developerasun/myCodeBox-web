import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import { execa } from "execa";
import listr from "listr";
import { projectInstall } from "pkg-install";
import Listr from "listr";

// main.js: hold primary logics to create template

/**
 * 1. get user options from cli function
 * 2. check file permission and do error handling
 * 3. set tasks to run and run
 * 4. copy templates to the directory user chose
 * 5. finish program
 */

const access = promisify(fs.access); // convert callback to promise
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDir, options.targetDir, {
    clobber: false,
  });
}

async function initGit(options) {
  const result = await execa("git", ["init"], {
    cwd: options.targetDir,
  });
  if (result.failed) {
    return new Promise.reject(new Error("Failed to initialize Git"));
  }
  return;
}

export async function createProject(options) {
  options = {
    ...options,
    targetDir: options.targetDir || process.cwd(),
  };
  const currentFileUrl = import.meta.url;

  // caution: take a close look at the path for template directory
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname.slice(3), // check file path
    "../templates",
    options.template.toLowerCase()
  );
  options.templateDir = templateDir;
  console.log(options.templateDir);

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s invalid template name", chalk.red.bold("ERROR"));
    console.log(options.templateDir);
    // The process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code
    // process.exit(1)
    process.exitCode = 1; // safer than process.exit(1)
  }

  const tasks = new listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },
    {
      title: "Initialize git",
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: "Install dependencies",
      task: () => projectInstall({ cwd: options.targetDir }),
      skip: () =>
        !options.runInstall
          ? "Pass --install to automatically install"
          : undefined,
    },
  ]);

  await tasks.run();

  console.log("Copy project files");
  await copyTemplateFiles(options);
  console.log("%s project ready", chalk.green.bold("DONE"));
  return true;
}
