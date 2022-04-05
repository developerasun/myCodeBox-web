<script lang="ts">
import { onMount, onDestroy } from 'svelte';

import app from '../main';

    import {count} from '../store/store'

    const increase = () => {
        count.update(num => num +1)
    }
    const decrease = () => {
        count.update(num => num -1)
    }

</script>

<main>
    <!-- Any name beginning with $ is assumed to refer to a store value. -->
    current store value: {$count}
    
    <button on:click={increase}>+</button>
    <button on:click={decrease}>-</button>
</main>