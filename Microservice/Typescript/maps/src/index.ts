import { User } from "./User"; // import the user function from te file directory
import { Company } from "./Company";
import { CustomMap } from "./CustomMap";

// console.log(user);

// const comapny = new Company();

// console.log(comapny);

const user = new User();
const company = new Company();
const customMap = new CustomMap("map");

customMap.addMarker(user);
customMap.addMarker(company);
