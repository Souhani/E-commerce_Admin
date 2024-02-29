import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { TermsOfUse } from "@/models/TermsOfUse";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req,res)

    if(method === 'GET') {
        res.json(await TermsOfUse.find())
    }

    if(method === 'PUT') {
      const { termsPage, _id} = req.body;
      const termsDoc = await TermsOfUse.findOneAndUpdate({_id}, { termsPage });
      res.json(termsDoc)
  };
  if(method === 'POST') {
    const { termsPage} = req.body;
    const termsDoc = await TermsOfUse.create({ termsPage });
    res.json(termsDoc)
};
}