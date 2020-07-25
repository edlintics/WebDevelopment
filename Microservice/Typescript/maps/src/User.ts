import faker from "faker";
import { Mappable } from "./CustomMap";

export class User implements Mappable {
  // the User need to satify all the Mappable interface
  // make the class usable to other file
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  color: string = "red";

  constructor() {
    this.name = faker.name.firstName(); // generate a random first name based on the faker library
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),

      // generate random lat titude and longtidtude, sicne it return a string type, you need to convert it to number with parse float
    };
  }

  markerContent(): string {
    return `User Name: ${this.name}`;
  }
}
