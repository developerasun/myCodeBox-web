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

## Slot

> Just like elements can have children, so can components. Before a component can accept children, though, it needs to know where to put them. We do this with the <slot> element.

## Event modifier

> DOM event handlers can have modifiers that alter their behaviour. For example, a handler with a once modifier will only run a single time:

```svelte
<script>
	function handleClick() {
		alert('no more alerts')
	}
</script>

<button on:click|once={handleClick}>
	Click me
</button>
```

## Bindings

> As a general rule, data flow in Svelte is top down — a parent component can set props on a child component, and a component can set attributes on an element, but not the other way around.

> Sometimes it's useful to break that rule. Take the case of the <input> element in this component — we could add an on:input event handler that sets the value of name to event.target.value, but it's a bit... boilerplatey. It gets even worse with other form elements, as we'll see.

> Instead, we can use the bind:value directive:

```svelte
<input bind:value={name}>
```

> This means that not only will changes to the value of name update the input value, but changes to the input value will update name.

## Group inputs

> If you have multiple inputs relating to the same value, you can use bind:group along with the value attribute. Radio inputs in the same group are mutually exclusive; checkbox inputs in the same group form an array of selected values.

> Add bind:group to each input:

```svelte
<input type=radio bind:group={scoops} name="scoops" value={1}>
```

> In this case, we could make the code simpler by moving the checkbox inputs into an each block. First, add a menu variable to the <script> block...

```js
let menu = [
	'Cookies and cream',
	'Mint choc chip',
	'Raspberry ripple'
];
```

> ...then replace the second section:

```svelte
<h2>Flavours</h2>

{#each menu as flavour}
	<label>
		<input type=checkbox bind:group={flavours} name="flavours" value={flavour}>
		{flavour}
	</label>
{/each}
```

## Store

> Not all application state belongs inside your application's component hierarchy. Sometimes, you'll have values that need to be accessed by multiple unrelated components, or by a regular JavaScript module.

> In Svelte, we do this with stores. A store is simply an object with a subscribe method that allows interested parties to be notified whenever the store value changes. In App.svelte, count is a store, and we're setting countValue in the count.subscribe callback.

> Click the stores.js tab to see the definition of count. It's a writable store, which means it has set and update methods in addition to subscribe.

```js
import { writable } from 'svelte/store';

export const count = writable(0);
```

> Now go to the Incrementer.svelte tab so that we can wire up the + button:

```js
function increment() {
	count.update(n => n + 1);
}
```

> Clicking the + button should now update the count. Do the inverse for Decrementer.svelte.

> Finally, in Resetter.svelte, implement reset:

```js
function reset() {
	count.set(0);
}
```

## Reactivity

> At the heart of Svelte is a powerful system of reactivity for keeping the DOM in sync with your application state — for example, in response to an event.

> Svelte automatically updates the DOM when your component's state changes. Often, some parts of a component's state need to be computed from other parts (such as a fullname derived from a firstname and a lastname), and recomputed whenever they change. For example, 

```svelte
<script>
let count = 0;
$: doubled = count * 2;
</script>

<p>{count} doubled is {doubled}</p>
```

> Of course, you could just write {count * 2} in the markup instead — you don't have to use reactive values. Reactive values become particularly valuable when you need to reference them multiple times, or you have values that depend on other reactive values.

> We're not limited to declaring reactive values — we can also run arbitrary statements reactively. For example, we can log the value of count whenever it changes:

```svelte
$: {
	console.log('the count is ' + count);
	alert('I SAID THE COUNT IS ' + count);
}

<!-- You can even put the $: in front of things like if blocks: -->
$: if (count >= 10) {
	alert('count is dangerously high!');
	count = 9;
}
```

## Reference 

- [Svelte.dev](https://svelte.dev/)
- [Svelte-preprocess-sass](https://www.npmjs.com/package/svelte-preprocess-sass)