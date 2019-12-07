export class FileItem {
    public archivo: File;
    public nombre: string;
    public url: string;
    public cargando: boolean;
    public progreso: number;

    constructor( archivo: File) {
        this.archivo = archivo;
        this.nombre = archivo.name;
        this.cargando = false;
        this.progreso = 0;
    }
}