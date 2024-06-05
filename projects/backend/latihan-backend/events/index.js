// TODO 1
const { EventEmitter } = require("events");

const myEventEmitter = new EventEmitter();

const birthdayEventListener = (name) => {
  console.log(`Happy birthday ${name}!`);
};

// TODO 2
myEventEmitter.on("birthday", birthdayEventListener);

// TODO 3
myEventEmitter.emit("birthday", "Dirga");

// TODO 4
myEventEmitter.removeListener("birthday", birthdayEventListener);
