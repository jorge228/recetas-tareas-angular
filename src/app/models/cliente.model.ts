export class ClienteModel {
    numCliente: number;
    nombre: string;
    foto: string;
    constructor(num, nom, fot){
        this.numCliente = num;
        this.nombre = nom;
        this.foto = fot;
    }
}