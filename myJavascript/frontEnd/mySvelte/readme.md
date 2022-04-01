# Learning Svelte essentials

> Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.

> Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes.

> We're proud that Svelte was recently voted the most loved web framework with the most satisfied developers in a pair of industry surveys. We think you'll love it too. Read the introductory blog post to learn more.

Run below two commands to install and create a svelte app. 

```shell
$npm i degit -g
$npx degit sveltejs/template (app-name)
```

And install dependency.

```shell
$npm install
```

And then run local dev server.

```shell
$npm run dev
```

## Typescript
> You can start a new Svelte TypeScript project using the normal template and by running node scripts/setupTypeScript.js before you do anything else:

```shell
$npx degit sveltejs/template svelte-typescript-app
$cd svelte-typescript-app
$node scripts/setupTypeScript.js
```

## Sass
Install below dependency for Sass. 

```shell
$npm install --save-dev svelte-preprocess-sass sass node-sass
```

Adjust rollup.config.ts like below.

```ts 
// .. 
export default {
    plugins: [
        svelte({
            preprocess: sveltePreprocess(
                { sourceMap: !production, sass: sass() }
            ),
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production
            }, 
        }),
        // more plugins
    ]
}
```

And then change lang to scss in style tag. 

```html
<style lang="scss">
    h1 { 
        color : black;
    }
</style>
```


# Reference 
- [Svelte.dev](https://svelte.dev/)
- [Svelte-preprocess-sass](https://www.npmjs.com/package/svelte-preprocess-sass)

adding a minimum number of test codes in React app using Jest and testing library
To do
 set directories for test
 writing 10 test codes for web3 & contracts
 writing 10 test codes for login and signup
 writing 10 test codes for chat app

1. client => react/redux toolkit/ts
1. server => Nest js, user API, artwork API
1. blockchain => hardhat / upgradable contracts