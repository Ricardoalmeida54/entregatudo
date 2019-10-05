import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators'
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    protected fire: AngularFireDatabase
  ) { }

  save(usuario) {
    return this.fire.list("usuarios").push(usuario);
  }

  getAll() {
    return this.fire.list("usuarios").snapshotChanges()
      .pipe(
        map(
          dados =>
            dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
        )
      );
  }

  get(id) {
    return this.fire.object<Usuario>("usuarios/" + id).valueChanges();
  }

  remover(id) {
    return this.fire.object("usuarios/" + id).remove();
  }

  update(usuario, id) {
    return this.fire.object("usuarios/" + id).update(usuario)
  }
}
