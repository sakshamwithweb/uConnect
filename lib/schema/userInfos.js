import { model, models, Schema } from "mongoose"

const userInfosSchema = new Schema({
    username: { type: String, required: true },
    pfp: { type: String, default: "/pfp.svg" },
    datas: { type: [Schema.Types.Mixed], default: [{ type: "raw-online", data: [] }] }
})

const UserInfos = models.userInfos || model("userInfos", userInfosSchema)
export default UserInfos