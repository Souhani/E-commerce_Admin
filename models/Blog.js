import {Schema, model, models} from "mongoose";

const BlogtSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    intro: {type: String, required: true},
    sections: [
        {
            header: {type: String, required: true},
            content: {type: String, required: true},
            image: String
        }
    ],
    outro: {type: String, required: true},
},{
	timestamps: true,
})

export const Blog =  models.Blog || model('Blog', BlogtSchema)
