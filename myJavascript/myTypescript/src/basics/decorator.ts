function logger(constructor: Function) {
  console.log("decorator here");
}

@logger
class Human {
  name = "jake";
  constructor() {
    console.log("wow");
  }
  callMyName() {
    console.log(this.name);
  }
}

const human = new Human();

human.callMyName(); // decorator will be called together
