import { mongooseConnect } from "@/lib/mongoose";
import { Support } from "@/models/Support";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if(method === 'GET') {
      if(req.query?.id){
        res.json(await Support.findOne({_id:req.query.id}))
      }else {
        res.json(await Support.find())
      }
    }
    if(method === 'POST') {
        const { name, email, message } = req.body;
        const supportDoc = await Support.create({
         name, email, message
      })
      res.json(supportDoc)
    }



  if(method === 'DELETE') {
    if (req.query?.id) {
      await Support.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}