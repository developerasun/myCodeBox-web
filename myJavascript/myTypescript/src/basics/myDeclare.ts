import { Person } from "./types";
import type { multiplyNumber as tt } from "./types";
import type { myObject } from "./types";

const check: typeof myObject = {
  name: "wow",
};

export type wow = typeof tt;

const myFunc: wow = (first, second) => {
  return first * second;
};

export let myString = "wow";

export function Human({ name, age }: Person) {
  return { name, age };
}
