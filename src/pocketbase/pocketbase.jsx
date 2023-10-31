import PocketBase from "pocketbase";

const pb = new PocketBase("https://umniah.pockethost.io");

export async function get() {
  const resultList = await pb.collection("gallery").getFullList();
  return resultList
}

export async function post(body) {
const record = await pb.collection("gallery").create(body);
    return record
  }


  export async function deletePost(id) {
    const record = await pb.collection("gallery").delete(id);
        return record
      }
    