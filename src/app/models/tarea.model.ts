export class TareaModel {
    id: string;
    fecha: string;
    descripcion: string;
    realizada: boolean;

    constructor(){
        this.realizada = false;
    }
}