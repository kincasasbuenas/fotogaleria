import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-items';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';
  constructor(private db: AngularFirestore) { }

  private saveImage( imagen: { nombre: string, url: string}) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`).add( imagen );
  }

  cargarImagenesFb( imagenes: FileItem []) {
    // console.log( imagenes );
    const storageRef = firebase.storage().ref();
    for (const item of imagenes) {
      item.cargando = true;

      if (item.progreso >= 100 ) {
        continue;
      }

      const loading: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombre}`)
                                                              .put( item.archivo);
      loading.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshop: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshop.bytesTransferred / snapshop.totalBytes ) * 100,
          (error) => console.log('error al subir ', error),
          () => {
              loading.snapshot.ref.getDownloadURL().then( (downloadURL) => {
              console.log('imagen cargada exitosamente');
              item.url = downloadURL;
              item.cargando = false;
              this.guardarImagen({nombre: item.nombre, url: item.url});
            });
          }
        // tslint:disable-next-line:semicolon
        )
    }
  }

  private guardarImagen( imagen: { nombre: string, url: string}) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);
  }
}
