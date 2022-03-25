<!-- root component -->
<script lang="ts">
	import Modal from './components/Modal.svelte'
	
	export let name = "Jake";
	let bg = 'black'
	const handleClick = () => {
		bg = 'blue'
	}
	const handleInput = (e) => {
		bg = e.target.value
	}
	let myArr = [
		1,
		2,
		3,
	]
	const handleDelete = (_item:number) => {
		console.log(_item)
		myArr = myArr.filter((elem) => {
			if (elem !== _item) {
				return elem
			}
		})
	}
</script>

<main>
	<!-- empty on:click => event forwarding in Svelte -->
	<Modal message="hey I'm prop for this component" on:click/>

	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<p>background color : {bg}</p>
	<button on:click={handleClick}>update bg color</button>
	<input type="text" on:input={handleInput} value={bg} name="" id="">

	{#if myArr.length < 1}
		<p>no items for now</p>
	{:else}
		{#each myArr as item }
		<div>iterating array : {item}</div>
		<button on:click={()=>handleDelete(item)}>delete number</button>
		{/each}
	{/if}

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: rgb(204, 204, 204);
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>