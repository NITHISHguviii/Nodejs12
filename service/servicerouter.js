import { clientdb } from "../index.js";
import bcrypt from "bcrypt";

 export async function generatehashedpassword(password) {
  const no_of_rounds = 10;
  const salt = await bcrypt.genSalt(no_of_rounds);
  const hashedpassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedpassword);
  return hashedpassword;
}

export async function Createuser(data) {
  return await clientdb.db("movies2").collection("users").insertOne(data);
}
export async function getuserbyname(username) {
  return await clientdb.db("movies2").collection("users").findOne({username:username});
}

