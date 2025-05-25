import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        Id:{type:String},
        Type:{type:Boolean},
        Text:{type:String},
        Sender:{type:String},
        SocketId:mongoose.Schema.Types.ObjectID,
        SenderId:mongoose.Schema.Types.ObjectID,
        ReceiverId:[mongoose.Schema.Types.ObjectID]
    }
)

const Message = new mongoose.model('message',messageSchema)
export default {Message}