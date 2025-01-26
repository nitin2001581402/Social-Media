import mongoose from 'mongoose'

const { Schema } = mongoose

const messageSchema = new Schema({
    sender_id: {
        type: Schema.ObjectId,
        required: true,
        ref: "User"
    },
    receiver_id: {
        type: Schema.ObjectId,
        required: true,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    }
}
    , { timestamps: true })

const MessageSchema = mongoose.model("message", messageSchema)
export default MessageSchema