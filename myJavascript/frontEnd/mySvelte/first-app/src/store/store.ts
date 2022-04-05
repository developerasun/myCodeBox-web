import { readable, writable } from "svelte/store";

// writable: Create a Writable store that allows both updating and reading by subscription.
export const count = writable(1)

// readable : Creates a Readable store that allows reading by subscription.
export const readableCount = readable(0)
