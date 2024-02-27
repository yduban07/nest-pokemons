import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {

    @Prop({
        unique: true,
        index: true, // Allows you to search through this property.
    })
    name:string;

    @Prop({
        unique: true,
        index: true,
    })
    no:number;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );