// type declaration files
// type definition file or type libraries
// .d.ts file extension
// to declare types. development time tools for compiler assistance

import { myObject } from "./notDeclared.js";

export declare const myObject = {
  name: string,
};

export declare type Person = {
  name: string;
  age: number;
};

export declare const foo = "bar";

// export function myFunc() {} // cannot declare function .d.ts file

// functions cannot implemtendededin typesccript
export declare function multiplyNumber(x: number, y: number) {
  return x * y;
};
