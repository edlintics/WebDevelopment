//interface, creating a new type

// interface Vehicle {
//   name: string;
//   year: Date; // type date, require an instance of date to be presened
//   broken: boolean;
//   summary(): string; // require a function name summary that return a string type
// }

interface Reportable {
  summary(): string; // require a function name summary that return a string type
}

const Oldcivic = {
  name: "civic",
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  },
};

const drink = {
  color: "brown",
  carnonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar} grams of sugar`;
  },
};

//look at the parameter that apply the type of Vehivle
const printSummary = (item: Reportable): void => {
  console.log(item.summary());
};

// both ofthem satisfy the type of Reportable
printSummary(Oldcivic);
printSummary(drink);
