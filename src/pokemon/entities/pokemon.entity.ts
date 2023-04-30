/*para que se transforme esta entidad en  un documento 
se debe de extender de la propiedad Document de mongoose*/
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
//se agrega el decorador Schema que hace referencia a la base de datos en Nestjs
@Schema()

export class Pokemon extends Document { 
    // id: string //mongodb me da este id
    /*Decorador Prop agrega ciertas propiedades
    unique > que indica que solo se puede tener una vez el mismo valor de la propiedad
    index > para hacer un indice de la propiedad */
    @Prop({ unique: true, index: true })
    name: string;
    
    @Prop({ unique: true, index: true })
    no: number;
}

/*por ultimo se exporta el Schema de la base de datos con las configuraciones
que queremos*/
export const PokemonSchema = SchemaFactory.createForClass( Pokemon );