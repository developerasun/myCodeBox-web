<script lang="ts">

// custom events
import { createEventDispatcher } from 'svelte'
let dispatch = createEventDispatcher()

// input variables
let nation
let sex
let age
let color

let skills = [] // group inputs

const handleSubmit = (event) => {
    event.preventDefault()
    console.log(nation, sex, age,skills, color)
    
    // create a new input
    const person = {
        nation, 
        sex, 
        age, 
        color, 
        id : Math.random()
    }

    // create a custom event when form submitted
    // dispatch : 1) event type 2) detail(event value)
    dispatch('addPerson', person)
}
</script>



<main>
    <!-- event forwarding -->
    <form action="" on:submit={handleSubmit} on:click> 
        <!-- value binding -->
        <input type="text" name="" id="" bind:value={nation}>
        <input type="text" name="" id="" bind:value={sex}>
        <input type="number" name="" id="" bind:value={age}>
        <input type="checkbox" name="" id="" bind:group={skills} value="fighting">fighting <br>
        <input type="checkbox" name="" id="" bind:group={skills} value="sneaking">sneaking <br>
        <input type="checkbox" name="" id="" bind:group={skills} value="running">running <br>
        <select name="" id="" bind:value={color}>
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
        </select>
        <button>submit</button>
    </form>
</main>



<style lang="scss"></style>