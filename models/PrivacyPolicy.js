import {Schema, model, models} from "mongoose";

const PrivacyPolicySchema = new Schema({
    privacyPage: {type: String, required: true},
})

export const PrivacyPolicy =  models.PrivacyPolicy || model('PrivacyPolicy', PrivacyPolicySchema)
