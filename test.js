const a = {
  unchange: 1,
  change: 2,
};

function changingObject(object) {
  object.change = 4;
}

changingObject(a);

console.log(a);
