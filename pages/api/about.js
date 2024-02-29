import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { About } from "@/models/About";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req,res)

    if(method === 'GET') {
        res.json(await About.find())
    }

    if(method === 'PUT') {
      const { aboutPage, _id} = req.body;
      const aboutDoc = await About.findOneAndUpdate({_id}, { aboutPage });
      res.json(aboutDoc)
  };
  if(method === 'POST') {
    const { aboutPage} = req.body;
    const aboutDoc = await About.create({ aboutPage });
    res.json(aboutDoc)
};
}