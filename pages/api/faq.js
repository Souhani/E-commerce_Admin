import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Faq } from "@/models/Faq";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req,res)

    if(method === 'GET') {
        res.json(await Faq.find())
    }

    if(method === 'PUT') {
      const { faq, _id} = req.body;
      const faqDoc = await Faq.findOneAndUpdate({_id}, { faq });
      res.json(faqDoc)
  };
}