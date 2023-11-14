import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) {
    this.cargarNotas();
  }
  title = 'notas';
  my_notes = [
    { id: 0, title: '', descripcion: '' }
  ];
  note = { id: 0, title: '', descripcion: '' };
  show_form = false;
  editing = false;


  private cargarNotas() {
    this.http.get('https://angular-notas-d00e1-default-rtdb.firebaseio.com/notas.json')
      .subscribe((resp: any) => {
        if (resp != null) {
          this.my_notes = resp;
        } else {
          this.my_notes.splice(0, 1);
        }
      }
      );
      console.log(Date())
  }

  addNote() {
    this.editing = false;
    this.note = { id: 0, title: '', descripcion: '' };
    this.show_form = true;
  }

  cancel() {
    this.cargarNotas();
    this.show_form = false;
    this.note = { id: 0, title: '', descripcion: '' };
  }

  createNote() {

    if (this.editing) {
      var me = this;
      this.my_notes.forEach(function (el, i) {
        if (el.id === me.note.id) {
          me.my_notes[i] = me.note;
        }
      });
      me.show_form = false;
      me.note = { id: 0, title: '', descripcion: '' };
    } else {
      this.note.id = Date.now();
      this.my_notes.push(this.note);
      this.show_form = false;
      this.note = { id: 0, title: '', descripcion: '' };
    }
    this.http.put('https://angular-notas-d00e1-default-rtdb.firebaseio.com/notas.json', this.my_notes)
      .subscribe((resp: any) => {
        console.log('actualizado')
        console.log(resp)
      }
      );
    console.log(this.my_notes);
  }

  viewNote(note: { id: number, title: string, descripcion: string }) {
    this.editing = true;
    this.note = note;
    this.show_form = true;
  }

  delete() {
    var me = this;
    this.my_notes.forEach(function (el, i) {
      if (el === me.note) {
        me.my_notes.splice(i, 1);
      }
    });
    this.http.put('https://angular-notas-d00e1-default-rtdb.firebaseio.com/notas.json', this.my_notes)
      .subscribe((resp: any) => {
        console.log('eliminado')
        console.log(resp)
      }
      );
    me.show_form = false;
    me.note = { id: 0, title: '', descripcion: '' };
  }
}
