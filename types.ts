import type { Document, Types } from "mongoose";

export interface UserProps extends Document {
    id:Types.ObjectId,
    email?: string;
    name?: string;
    password: string;
    avatar?: string;
    created?: Date;
}


export interface ConversationProps extends Document {
    _id: Types.ObjectId;
    type: 'direct' | "group";
    name?: string;
    participants?: Types.ObjectId[];
    lastMessage?: Types.ObjectId;
    createdBy: Types.ObjectId;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}