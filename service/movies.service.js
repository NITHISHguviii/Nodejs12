import { clientdb } from "../index.js";

export async function updateone(id, data) {
  return await clientdb
    .db("movies2")
    .collection("moviesdata3")
    .updateOne({ id: id }, { $set: data });
}
export async function deletemovie(id) {
  return await clientdb
    .db("movies2")
    .collection("moviesdata3")
    .deleteOne({ id });
}
export async function updatemovie(data) {
  return await clientdb
    .db("movies2")
    .collection("moviesdata3")
    .insertMany(data);
}
export async function getmoviebyid(id) {
  return await clientdb.db("movies2").collection("moviesdata3").findOne({ id });
}
export async function getmovie(request) {
  return await clientdb
    .db("movies2")
    .collection("moviesdata3")
    .find(request.query)
    .toArray();
}
