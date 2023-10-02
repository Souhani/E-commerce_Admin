import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res){
    if(req.method!=='GET'){
        res.jon('should be a get request');
        return;
    }
    await mongooseConnect();
    await isAdminRequest(req,res);
    const ordersDoc = await Order.find().sort({createdAt:-1});
    res.json(ordersDoc);
}