import multiparty from 'multiparty';
import {v2 as cloudinary} from 'cloudinary';
import { mongooseConnect } from '@/lib/mongoose';
import { isAdminRequest } from './auth/[...nextauth]';

export default async function handle(req, res) {
  
  await mongooseConnect();
  await isAdminRequest(req,res)
    cloudinary.config({ 
        cloud_name: process.env.CLOUDNAME, 
        api_key: process.env.CLOUDAPIKEY, 
        api_secret: process.env.CLOUDINARYSECRET 
      });

    const form = new multiparty.Form();
    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if(err) reject(err);
            resolve({fields, files})
        });
    } );


    const links = [];
     for(const file of files.file) {
         await cloudinary.uploader.upload(file.path, (error, result) => {
            if (error) {
              console.error(error);
            } else {
              const link = result.url
              links.push(link)

            }
          });

    };

    res.json(links)

};

///


export const config = {
    api: {bodyParser: false},
}