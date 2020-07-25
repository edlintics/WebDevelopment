// Create classs (like a blue print)
class Vehicle {
  constructor(public color: string) {
    // aconstructor allow you to modify a field in the class when create a new instance
  }

  protected honk(): void {
    // the protected make this function only acessible in the child class
    console.log("beep");
  }
}

//create an instance of a class
const vehicle = new Vehicle("orange"); // modify the color based on the constructor that is given in the Vehicle class
console.log(vehicle.color);

class Car extends Vehicle {
  // allow class car to be able to have all properties and function of vehicle class

  constructor(public wheels: number, color: string) {
    // multiple contructor, since this inherit from the parent vehicle, it needs the color argument as well
    super(color); // inherit from the parent of vehicle
  }

  private drive(): void {
    // overwrite function form the parent component
    // the private indicate that this function is only acessible in side this class
    // the private is use when you dont want other developers to call it, which increase the chance of breaking the app

    console.log("vroom");
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

// create an instance of a car

const car = new Car(4, "red"); // the red is called on the constructor of the parent function
car.startDrivingProcess(); // inherit from vehivle
