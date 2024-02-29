import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req,res)

    if(method === 'GET') {
      if(req.query?.id){
        res.json(await Product.findOne({_id:req.query.id}))
      }else {
        res.json(await Product.find())
      }
    }
    if(method === 'POST') {
        const {title,
          description,
          subtitle,
          machines,
          thumbnail,
          features,
          properties,
          testimonials,
          files} = req.body;
        const productDoc = await Product.create({
          title,
          description,
          subtitle,
          machines,
          thumbnail,
          features,
          properties,
          testimonials,
          files
      })
      res.json(productDoc)
    }

    if(method === 'PUT') {
      const { title,
        description,
        subtitle,
        machines,
        thumbnail,
        features,
        properties,
        testimonials,
        files,
         _id} = req.body;
      const updatedP = await Product.updateOne({_id}, { title,
        description,
        subtitle,
        machines,
        thumbnail,
        features,
        properties,
        testimonials,
        files});
  };

  if(method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}