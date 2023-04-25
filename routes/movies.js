import express from "express";
import { clientdb } from "../index.js";

const router = express.Router();
router.get("/", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  const movies = await clientdb
    .db("movies2")
    .collection("moviesdata3")
    .find(request.query)
    .toArray();
  response.send(movies);
});
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  //const movie = movies.find((mv) => mv.id === id);
  const movie = await clientdb
    .db("movies2")
    .collection("moviesdata3")
    .findOne({ id });

  movie
    ? response.send(movie)
    : response.status(404).send({ message: "message not found" });
});
router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);

  const movies = await clientdb
    .db("movies2")
    .collection("moviesdata3")
    .insertMany(data);
  response.send(movies);
});
router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  //const movie = movies.find((mv) => mv.id === id);
  const result = await clientdb
    .db("movies2")
    .collection("moviesdata3")
    .deleteOne({ id });

  result
    ? response.send(result)
    : response.status(404).send({ message: "message not found" });
});
router.put("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  const data = request.body;
  console.log(data);
  //const movie = movies.find((mv) => mv.id === id);
  const results = await clientdb
    .db("movies2")
    .collection("moviesdata3")
    .updateOne({ id: id }, { $set: data });
  console.log(results);

  response.send(results);
});
export default router;
