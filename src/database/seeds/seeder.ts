import { storeRepository } from "../repositories";

export const seeder = async () => {
  await storeRepository.create({
    username: "sahragty",
    password: process.env["DEFAULT_PASSWORD"],
    address: "12 Ismail Helmy St, Smouha, Alexandria Governorate, Egypt",
    email: "omar_elsahragty@hotmail.com",
    name: "Sahragty Market",
    phone: "+20 1111111111",
    type: "Supermarket",
    accessType: "ADMIN",
    long: 0,
    lat: 0,
  });
};
