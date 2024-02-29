import {Schema, model, models} from "mongoose";

const AboutSchema = new Schema({
    aboutPage: {type: String, required: true},
})

export const About =  models.About || model('About', AboutSchema)
