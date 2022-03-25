<script>
// create a prop for this component
export let message;

let toggle = false

const handleToggle = () => {
    toggle = !toggle
}
</script>

<div id="modal">
    <!-- event forwarding Svelte -->
    <div id="container" class:promo={true} on:click={handleToggle}>
        <p>sign up for play</p>
        {#if toggle === true}
            {message}
            {:else}
            "not toggled"
        {/if}
    </div>
</div>


<style>
#container { 
    background-color: rgb(223, 223, 223);
    padding: 2rem;
    color: black;
}

.promo { 
    box-shadow: 5px 5px 10px red;
}

</style>