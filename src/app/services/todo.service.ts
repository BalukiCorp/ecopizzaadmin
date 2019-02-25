import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

export interface Todo {
  id ?: string;
  name: string;
  telephone: string;
  location: string;
  size: string;
  category: string;
  quantity: string;
  drink: string;
  drink_quantity: string;
}
@Injectable({
  providedIn: 'root'
})

export class TodoService {
  uploadPercent: Observable<number>;
  private todosCollection: AngularFirestoreCollection<Todo>;
  private todos: Observable<Todo[]>;
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.todosCollection = db.collection<Todo>('todos');
    this.todos = this.todosCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return  {id, ...data};
      });
    }));
  }
  getTodos() {
    return this.todos;
  }
  getTodo(id) {
    return this.todosCollection.doc<Todo>(id).valueChanges();
  }
}
