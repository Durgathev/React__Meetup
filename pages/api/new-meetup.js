import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const data = req.body;
    const { image, title, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://durgathev:123@cluster0.br9qdia.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const collectionname = db.collection("meetups");
    const result = await collectionname.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "inserted succesfully" });
  }
};

export default handler;
