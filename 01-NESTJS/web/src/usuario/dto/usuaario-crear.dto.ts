import { IsEmpty, IsNotEmpty, IsOptional, IsString, Max, MaxLength, MinLength} from "class-validator";
import {IsAlpha} from "class-validator";


export class UsuarioCrearDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    @IsAlpha()
    apellido: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    nombre: string;

    @IsEmpty()
    fechaCreacion: string;
}