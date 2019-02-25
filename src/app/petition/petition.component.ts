import { Component, OnInit } from '@angular/core';
import {Todo, TodoService} from '../services/todo.service';
import {AuthService} from '../auth/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-petition',
  templateUrl: './petition.component.html',
  styleUrls: ['./petition.component.scss']
})
export class PetitionComponent implements OnInit {
  todos: Todo[];
  todo: Todo = {
    name: '',
    telephone: '',
    location: '',
    size: '',
    category: '',
    drink: '',
    quantity: '',
    drink_quantity: '',
  };
  constructor(private location: Location,private  todoService: TodoService, public authService: AuthService) { }
  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }
  signOut() {
    this.authService.logout();
  }
  reLoad() {
    location.reload();
  }
}
