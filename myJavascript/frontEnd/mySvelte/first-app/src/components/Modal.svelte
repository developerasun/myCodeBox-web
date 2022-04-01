<script lang="ts">
// create a prop for this component
export let message;

let toggle = false

const handleToggle = () => {
    toggle = !toggle
}
</script>

<div id="modal">
    <!-- event forwarding Svelte -->
    <!-- once : event modifier -->
    <div id="container" class:promo={true} on:click|once ={handleToggle}>
        <p>sign up for play</p>
        {#if toggle === true}
            {message}
            {:else}
            "not toggled"
        {/if}
        <slot name="greetings"></slot>
    </div>
    <!-- Components can have child content with slot tag, in the same way that elements can. -->
    <div id="secondModalChild">
        <slot></slot>
    </div>
    <!-- named slot -->
    
</div>


<style lang="scss">
#container { 
    background-color: rgb(223, 223, 223);
    padding: 2rem;
    color: black;
}

.promo { 
    box-shadow: 5px 5px 10px red;
}

#secondModalChild {
    background-color: blue;
    font-size: 1.2rem;
}

</style>