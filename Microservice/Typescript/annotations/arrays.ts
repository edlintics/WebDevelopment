const carMakers: string[] = ["ford", "toyota", "chevy"];
const date = [new Date(), new Date()];

//2 dimensional array
const carsByMake: string[][] = [["f150"], ["corolla"], ["camaro"]];

// Help with inference when extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible value

carMakers.push(100);

//Help with map

carMakers.map((car: string): string => {
  return car.toUpperCase();
});

//Felxible type
const importantDate: (Date | string)[] = [new Date(), "2030-10-10"]; // eiteh rbe an insance of date object or string
importantDate.push("2030-10-10");
importantDate.push(new Date());
