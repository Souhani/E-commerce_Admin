import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Blog } from "@/models/Blog";

export default async function  handle(req, res) {
    const {method} =req;
    await mongooseConnect();

    await isAdminRequest(req,res)

    if(method === 'GET') {
      if(req.query?.id){
        res.json(await Blog.findOne({_id:req.query.id}))
      }else {
        res.json(await Blog.find())
      }
    }

    if(method === 'POST') {
      const { title,
        author,
        intro,
        sections,
        outro} = req.body;
      const  blogDoc = await Blog.create({ title,
        author,
        intro,
        sections,
        outro});
      res.json(blogDoc);
      
    }

    if(method === 'PUT') {
      const {title,
        author,
        intro,
        sections,
        outro,
         _id} = req.body;
      const  blogDoc = await Blog.updateOne({_id},{
        title,
        author,
        intro,
        sections,
        outro
      });
      res.json(blogDoc) 
    }

    if(method === 'DELETE') {
      if (req.query?.id) {
        await Blog.deleteOne({_id:req.query?.id});
        res.json(true);
      }
    }
}