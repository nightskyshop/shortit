import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";
import createShortURL from "@/lib/createShortURL";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();
  console.log(mongoose.connection.readyState);
  console.log(ShortLink);

  switch (req.method) {
    case "GET":
      const shortLinks = await ShortLink.find();
      res.send(shortLinks);
      break;

    case "POST":
      const { title, url } = req.body;
      const shortUrl = createShortURL(url);

      const newShortLink = await ShortLink.create({
          title,
          url,
          shortUrl
      });
      res.status(201).send(newShortLink);
      break;

    default:
      res.status(404).send();
  }
}