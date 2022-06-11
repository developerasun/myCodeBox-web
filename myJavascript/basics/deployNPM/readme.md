# Learning how to publish NPM package

Use follow commands to publish
1. npm login
2. npm whoami (check if well login-ed)
3. npm publish(package name should be unique)

## How to update the published package

1. Refactor your codes and commit changes if the project is hosted at github.
1. Change the package's version with semantic versioing.

```sh
npm version patch
npm version minor
npm version major
```

check the package version is updated. 

![update-npm-version](https://user-images.githubusercontent.com/83855174/173185738-e5015720-8667-44a4-a035-591e867e8c4b.png)

1. Run npm publish to update the package.

![npm-publish](https://user-images.githubusercontent.com/83855174/173185765-262da4a2-603a-4f54-8ac2-c6c68e859161.png)

## Reference

- [How to deploy a NPM package 2020](https://youtu.be/3joD4oN4fOY)
- [How to Update an npm Package (Fixing "You cannot publish over the previously published versions")](https://simplernerd.com/update-published-npm-package/)