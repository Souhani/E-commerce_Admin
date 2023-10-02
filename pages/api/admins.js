import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Admin } from "@/models/Admin";

export default async function handler(req, res) {
    await mongooseConnect();
    await isAdminRequest(req, res);
    if(req.method === 'POST') {
        if(await Admin.findOne({email: req.body.email})){
            res.status(400).json({message: 'Admin already exist!'})
        }else {
                 const adminDoc = await Admin.create({email: req.body.email});
                    res.json(adminDoc);
                };
        }

    if(req.method === 'GET'){
        const adminDoc = await Admin.find();
        res.json(adminDoc);
    };

    if(req.method === 'DELETE'){
        const {id} = req.query;
        const adminDoc = await Admin.findByIdAndDelete(id);
        res.json(true);
    }
}