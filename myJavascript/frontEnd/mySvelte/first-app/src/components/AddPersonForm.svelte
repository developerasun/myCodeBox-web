<script lang="ts">
let nation
let sex
let age

const handleSubmit = (event) => {
    event.preventDefault()
    console.log(nation, sex, age)
}
</script>



<main>
    <!-- event forwarding -->
    <form action="" on:submit={handleSubmit} on:click> 
        <!-- value binding -->
        <input type="text" name="" id="" bind:value={nation}>
        <input type="text" name="" id="" bind:value={sex}>
        <input type="number" name="" id="" bind:value={age}>
        <button>submit</button>
    </form>
</main>



<style lang="scss"></style>