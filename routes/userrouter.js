import express from "express";
import { Createuser } from "../service/servicerouter.js";
import { generatehashedpassword } from "../service/servicerouter.js";

const router = express.Router();

router.post("/signup", async function (request, response) {
  const {username,password} = request.body;
  const hashedpassword= await generatehashedpassword(password);
  
 // console.log(data);

  const result = await Createuser({
    username:username,
    password:hashedpassword,
  });
  response.send(result);
});

export default router;
