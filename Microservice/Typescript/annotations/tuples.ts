const drink = {
  color: "brow",
  carbonated: "true",
  sugar: 40,
};

//Assigning a type in each property
const pepsi: [string, boolean, number] = ["brown", true, 40];

// type allias, reusable structure
type Drink = [string, boolean, number];
const sprite: Drink = ["red", true, 40];

const carSpecs: [number, number] = [400, 3354];

const carStats = {
  horsePower: 400,
  weight: 3354,
};
