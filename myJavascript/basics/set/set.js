const set1 = new Set();
set1.add(42);
set1.add("forty two");

const iterator1 = set1.values();

console.log(iterator1.next().value);
// // expected output: 42

console.log(iterator1.next().value);
// expected output: "forty two"

console.log("==================");

// set is a list that contains an unique value.
for (let value of set1) {
  console.log(value);
}
console.log(set1);
