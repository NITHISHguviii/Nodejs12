import express from "express";
import {
  getmovie,
  getmoviebyid,
  updatemovie,
  deletemovie,
  updateone,
} from "../service/movies.service.js";

const router = express.Router();
router.get("/", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  const movies = await getmovie(request);
  response.send(movies);
});
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  //const movie = movies.find((mv) => mv.id === id);
  const movie = await getmoviebyid(id);

  movie
    ? response.send(movie)
    : response.status(404).send({ message: "message not found" });
});
router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);

  const movies = await updatemovie(data);
  response.send(movies);
});
router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  //const movie = movies.find((mv) => mv.id === id);
  const result = await deletemovie(id);

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
  const results = await updateone(id, data);
  console.log(results);

  response.send(results);
});
export default router;
