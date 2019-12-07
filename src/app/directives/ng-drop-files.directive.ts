import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-items';
@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem [] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter;
  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseOver.emit( true );
    this._prevenirDetener( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseOver.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    const transferencia = this._getTransferencia( event );

    if ( !transferencia) {
      return;
    }

    this._extraerArchivos( transferencia.files );
    this._prevenirDetener( event );
    this.mouseOver.emit( false );

  }

  // extension para compatibilidad de navegadores
  private _getTransferencia( event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( archivoLista: FileList) {
    // tslint:disable-next-line:forin
    for ( const propiedad in Object.getOwnPropertyNames( archivoLista )){
      const archivoTmp = archivoLista[propiedad];
      if (this._archivoPuedeSerCargado(archivoTmp)) {
        const nuevoArchivo = new FileItem ( archivoTmp );
        this.archivos.push( nuevoArchivo );
      }
    }
    console.log( this.archivos );
  }

  // Validaciones
  private _archivoPuedeSerCargado( archivo: File): boolean {
    if (!this._archivoPrecargado(archivo.name) && this._esImagen(archivo.type)){
      return true;
    } else {
      return false;
    }
  }

  private _prevenirDetener( event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoPrecargado(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombre === nombreArchivo) {
        console.log('Archivo ' + nombreArchivo + ' ya esta precargado');
        return true;
      }
    }
    return false;
  }

  private _esImagen( tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }
}
