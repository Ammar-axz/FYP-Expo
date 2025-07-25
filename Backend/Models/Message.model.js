import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        Id:{type:String},
        Type:{type:Boolean},
        Text:{type:String},
        Sender:{type:String},
        SocketId:mongoose.Schema.Types.ObjectId,
        SenderId:mongoose.Schema.Types.ObjectId,
        ReceiverId:[mongoose.Schema.Types.ObjectId]
    }
)

const Message = new mongoose.model('message',messageSchema)
export default Message