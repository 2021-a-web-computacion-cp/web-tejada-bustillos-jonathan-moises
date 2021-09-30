import {
    IsBoolean,
    IsDate,
    IsDecimal,
    IsEmpty, isIn, isInt,
    IsInt,
    IsNotEmpty,
    IsNumber, IsPositive,
    IsString,
    MaxLength,
    MinLength
} from "class-validator";

export class InstrumentoEditarDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    id:number

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
    @IsPositive()
    cantidad:number

    @IsEmpty()
    fechaRegistro:Date

    @IsBoolean()
    usado:boolean

    @IsNotEmpty()
    @IsNumber()
    precio:number
}