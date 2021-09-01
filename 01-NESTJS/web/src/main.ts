import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
/*
abstract class Nombre {
  public nombrePropiedad?: string;
  private apellidoPropiedad: string = 'Equez';
  protected edad = 1; // number (Duck Tuping)
  static comun: number = 10;
  propiedadPublica: string;
  constructor(
      propiedadPublicaParanetro: string, // paronetro
      public propiedadRapido: string, // transforma una propiedad
  ) {
    this.propiedadPublica = propiedadPublicaParanetro;
    this.propiedadRapido;
  }


  public funcionPublica(parametroString:string):void{

  }

  private funcionPrivada(parametroString:string,
                         parametroNumber?: number){

  }


  protected funcionPublica(): number{
    return 1;
  }

  static funcionEstatica(): string{
    return 'string';
  }

}
*/

/*
// Primitivas
//package.json
//npm tun start
//nodejs command propmt

var variableUno = 1; //No usaamos var !
let variableDos = 2;
variableUno = 3;
variableDos = 4;

//INMUTABLES (No se puede reasignar x -> !=)

const variableTres = 5;
// vairbaleTres ) 2; //error

//Primitivas primitivas

const texto: string = ''; // "" ''
const numeroEntero: number = 1;
const numeroFlotante: number = 1.2;
const soyEstudiante: boolean = true;
const noDefinido = undefined;
const noHayNada = null;
const fecha: Date = new Date();

//Duck Typing

const textoDos = 'Adrian';
let cualquierCosa: any = 'Vicente';
cualquierCosa = 1;
cualquierCosa = true;
cualquierCosa = new Date();



//clases

class Usuario {
  constructor(public nombre: string, public apellido: string) {}
}

const usuario: Usuario = new Usuario('Boris','Javier');
usuario.nombre;
usuario.apellido;

interface UsuarioInterface {
  nombre: string;
  apellido: string;
  edad?: number; //? => OPcional //Valor por defecto es undfined.
}

const objetoUsuario: UsuarioInterface = {
  nombre: 'Adrian', apellido: 'Eguez',edad: 12
};

// primitivas

let edadAntigua = 22;
let otraedad = edadAntigua;
edadAntigua += 1;
otraedad -= 1;

const objetoEdad = {
  edad: 22,
};

const otraEdadObjeto = objetoEdad;
otraEdadObjeto.edad = otraEdadObjeto.edad +1;

console.log(otraEdadObjeto.edad);
console.log(objetoEdad);

const arregloTodo =[1, '',true,null,new Date()];
const arregloNumeros:number[]=[1,2,3,4,5];


function funcionConNombre() {

}
const indice = arregloNumeros.findIndex((numero:number)=>
    {
          const elvalorEsIgualATres: boolean = numero === 3;
          return elvalorEsIgualATres
        },
    );

arregloNumeros[indice]=6;

arregloNumeros.push(6);

arregloNumeros.unshift(0);

//condiciones -> Truty y falsy

const numeroOrden =0;
if(numeroOrden){
  console.log('Truty');
}else{
  console.log('Falsy');
}
if(1){
  console.log('Truty');
}else{
  console.log('Falsy');
}
if(-1){
  console.log('Truty');
}else{
  console.log('Falsy');
}

if(""){
  console.log('Truty');
}else{
  console.log('Falsy');//falsy
}
if("a"){
  console.log('Truty');//truty
}else{
  console.log('Falsy');
}
if({}){
  console.log('Truty');
}else{
  console.log('Falsy');//falsy
}
if({a:1}){
  console.log('Truty');//truty
}else{
  console.log('Falsy');
}

if([]){
  console.log('Truty');
}else{
  console.log('Falsy');//falsy
}
if([1]){
  console.log('Truty');//truty
}else{
  console.log('Falsy');
}

if([null]){
  console.log('Truty');
}else{
  console.log('Falsy');//falsy
}
if([undefined]){
  console.log('Truty');
}else{
  console.log('Falsy');//falsy
}

*/
