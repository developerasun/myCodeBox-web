# Learning NPM essentials 
> npm is the world's largest software registry. Open source developers from every continent use npm to share and borrow packages, and many organizations use npm to manage private development as well.

> npm consists of three distinct components:

1. the website
1. the Command Line Interface (CLI)
1. the registry

> Use the website to discover packages, set up profiles, and manage other aspects of your npm experience. For example, you can set up organizations to manage access to public or private packages. The CLI runs from a terminal, and is how most developers interact with npm. The registry is a large public database of JavaScript software and the meta-information surrounding it.

## Install
> To publish and install packages to and from the public npm registry, you must install Node.js and the npm command line interface using either a Node version manager or a Node installer. We strongly recommend using a Node version manager to install Node.js and npm. We do not recommend using a Node installer, since the Node installation process installs npm in a directory with local permissions and can cause permissions errors when you run npm packages globally.

### Local installation
> When installing locally, npm first tries to find an appropriate prefix folder. This is so that npm install foo@1.2.3 will install to the sensible root of your package, even if you happen to have cded into some other folder.

> Starting at the $PWD, npm will walk up the folder tree checking for a folder that contains either a package.json file, or a node_modules folder. If such a thing is found, then that is treated as the effective "current directory" for the purpose of running npm commands. (This behavior is inspired by and similar to git's .git-folder seeking logic when running git commands in a working dir.)

> If no package root is found, then the current folder is used.

> When you run npm install foo@1.2.3, then the package is loaded into the cache, and then unpacked into ./node_modules/foo. Then, any of foo's dependencies are similarly unpacked into ./node_modules/foo/node_modules/....

> Any bin files are symlinked to ./node_modules/.bin/, so that they may be found by npm scripts when necessary.

### Global installation
> If the global configuration is set to true, then npm will install packages "globally".

> For global installation, packages are installed roughly the same way, but using the folders described above.

## Folder structure
> npm puts various things on your computer. That's its job. This document will tell you what it puts where.

1. Local install (default): puts stuff in ./node_modules of the current package root.
1. Global install (with -g): puts stuff in /usr/local or wherever node is installed.
1. Install it locally if you're going to require() it.
1. Install it globally if you're going to run it on the command line.
1. If you need both, then install it in both places, or use npm link.

### Prefix configuration
> The prefix config defaults to the location where node is installed. On most systems, this is /usr/local. On Windows, it's %AppData%\npm. On Unix systems, it's one level up, since node is typically installed at {prefix}/bin/node rather than {prefix}/node.exe.

> When the global flag is set, npm installs things into this prefix. When it is not set, it uses the root of the current package, or the current working directory if not in a package already.

### Node modules
> Packages are dropped into the node_modules folder under the prefix. When installing locally, this means that you can require("packagename") to load its main module, or require("packagename/lib/path/to/sub/module") to load other modules.

> Global installs on Unix systems go to {prefix}/lib/node_modules. Global installs on Windows go to {prefix}/node_modules (that is, no lib folder.)

> Scoped packages are installed the same way, except they are grouped together in a sub-folder of the relevant node_modules folder with the name of that scope prefix by the @ symbol, e.g. npm install @myorg/package would place the package in {prefix}/node_modules/@myorg/package. See scope for more details.

> If you wish to require() a package, then install it locally.

### Executable
> When in global mode, executables are linked into {prefix}/bin on Unix, or directly into {prefix} on Windows. Ensure that path is in your terminal's PATH environment to run them.

> When in local mode, executables are linked into ./node_modules/.bin so that they can be made available to scripts run through npm. (For example, so that a test runner will be in the path when you run npm test.)

## Npm cache
> Manipulates packages cache. Used to add, list, or clean the npm cache folder.

1. add: Add the specified packages to the local cache. This command is primarily intended to be used internally by npm, but it can provide a way to add data to the local installation cache explicitly.

1. clean: Delete all data out of the cache folder. Note that this is typically unnecessary, as npm's cache is self-healing and resistant to data corruption issues.

1. verify: Verify the contents of the cache folder, garbage collecting any unneeded data, and verifying the integrity of the cache index and all cached data.

## Package.json
> This document is all you need to know about what's required in your package.json file. It must be actual JSON, not just a JavaScript object literal.

A lot of the behavior described in this document is affected by the config settings described in config

### Name and version
> If you plan to publish your package, the most important things in your package.json are the name and version fields as they will be required. The name and version together form an identifier that is assumed to be completely unique. Changes to the package should come along with changes to the version. If you don't plan to publish your package, the name and version fields are optional.

> The name will probably be passed as an argument to require(), so it should be something short, but also reasonably descriptive.

> Version must be parseable by node-semver, which is bundled with npm as a dependency. (npm install semver to use it yourself.)

### Description
will be added 

### Keywords
will be added 

## Reference
- [Npm official docs](https://docs.npmjs.com/about-npm)