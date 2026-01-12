import { Socket ,Server as  SocketIOServer} from "socket.io"


export const registerUserEvents = async(io:SocketIOServer,socket:Socket)=>{
    socket.on("testSocket",(data)=>{
        socket.emit("testSocket",{msg:"its updated!!!"});
    })
}