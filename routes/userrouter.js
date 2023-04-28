import express from "express";
import { Createuser } from "../service/servicerouter.js";
import { generatehashedpassword } from "../service/servicerouter.js";
import { getuserbyname } from "../service/servicerouter.js";
import jwt from "jsonwebtoken";// gives token to user
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async function (request, response) {
  const { username, password } = request.body;
  const userfromdb = await getuserbyname(username);
  console.log(userfromdb);
  if (userfromdb) {
    response.status(400).send({ message: "username is already exist" });
  } else if(password.length<8){
    response.status(400).send({ message: "password musst me greater than 8" });
  } else {
    const hashedpassword = await generatehashedpassword(password);

    //console.log(data);

    const result = await Createuser({
      username: username,
      password: hashedpassword,
    });
    response.send(result);
  }
});
router.post("/login", async function (request, response) {
  const { username, password } = request.body;
  const userfromdb = await getuserbyname(username);
  console.log(userfromdb);
  if (!userfromdb) {
   
    response.status(401).send({ message: "invalid credentials" });
  }  else{
      const storedbpassword=userfromdb.password;
      const ispasswordcheck=await bcrypt.compare(password,storedbpassword);
      console.log(ispasswordcheck)
      if(ispasswordcheck){
        const token =jwt.sign({id:userfromdb.id},process.env.secret_key)
        response.status(400).send({message:"successfully login",token})
      }
      else{
        response.status(401).send({ message: "invalid credentials" });
      }
  }
    
  
});

export default router;
