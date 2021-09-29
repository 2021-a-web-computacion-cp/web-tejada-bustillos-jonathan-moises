import {
    IsBoolean,
    IsDate,
    IsDecimal,
    IsEmpty,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength
} from "class-validator";

export class InstrumentoCrearDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    nombre:string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    tipo:string


    @IsNotEmpty()
    @IsInt()
    cantidad:number

    @IsEmpty()
    fechaRegistro:Date

    @IsBoolean()
    usado:boolean

    @IsNotEmpty()
    @IsNumber()
    precio:number
}