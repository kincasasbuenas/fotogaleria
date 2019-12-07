import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items';
import { CargaImagenesService } from '../../services/carga-imagenes.service';


@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  archivos: FileItem [] = [];
  overElement = false ;
  constructor(private _cargaImagenes: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagen() {
    this._cargaImagenes.cargarImagenesFb(this.archivos);
  }

  sobreElemento( event) {
    console.log(event);
  }

  limpiarArchivos() {
    this.archivos = [];
  }

}
