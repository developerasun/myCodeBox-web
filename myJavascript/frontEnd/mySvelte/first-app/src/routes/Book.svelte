<script lang="ts">
    import { push, pop, replace } from 'svelte-spa-router';

    // You need to define the component prop "params"
    // variable name for route parameters should be params
    export let params = {
        id: '' // dynamic routes
    } 
</script>
<main>
    book
    id: {params.id}
</main>
<style lang="scss">

</style>