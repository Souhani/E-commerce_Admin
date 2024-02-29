import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { PrivacyPolicy } from "@/models/PrivacyPolicy";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req,res)

    if(method === 'GET') {
        res.json(await PrivacyPolicy.find())
    }

    if(method === 'PUT') {
      const { privacyPage, _id} = req.body;
      const privacyDoc = await PrivacyPolicy.findOneAndUpdate({_id}, { privacyPage });
      res.json(privacyDoc)
  };
  if(method === 'POST') {
    const { privacyPage} = req.body;
    const privacyDoc = await PrivacyPolicy.create({ privacyPage });
    res.json(privacyDoc)
};
}