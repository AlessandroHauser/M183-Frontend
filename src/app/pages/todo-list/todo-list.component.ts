import {Component, OnInit} from '@angular/core';
import {Todo} from "../../entities/Todo";
import {Observable} from "rxjs";
import {Status} from '../../entities/Status';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  constructor(
    private clientService: ClientService,
    private snackBar: MatSnackBar) {
  }

  private todos$: Observable<Todo[]> = this.clientService.getTodos();
  protected todos: Todo[] = [];

  ngOnInit(): void {
    this.todos$.subscribe(todos => {
      this.todos = todos;
    })
  }

  createTodo(task: string) {
    const todo = new Todo(0,
      task,
      Status.IN_PROGRESS,
      new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7))
    )
    this.clientService.createTodo(todo).subscribe(todo => {
      this.todos.push(todo);
      this.snackBar.open('Todo created', 'Close');
    })
  }

  updateTodo(todo: Todo, textAreaElement: HTMLTextAreaElement) {
    textAreaElement.disabled = true;
    todo.task = textAreaElement.value;
    this.sendUpdate(todo)
  }

  updateStatus(todo: Todo) {
    todo.status = Status.DONE;
    this.sendUpdate(todo);
  }

  sendUpdate(todoU: Todo) {
    this.clientService.updateTodo(todoU).subscribe(todo => {
      let removeIndex: number = this.todos.findIndex((t: Todo) => t.id == todo.id);
      this.todos = [...this.todos.slice(0, removeIndex), todo, ...this.todos.slice(removeIndex + 1)]
      this.snackBar.open('Todo updated', 'Close');
    })
  }

  deleteTodo(id: number) {
    this.clientService.deleteTodo(id).subscribe(_ => {
      let removeIndex: number = this.todos.findIndex((t: Todo) => t.id == id);
      this.todos = [...this.todos.slice(0, removeIndex), ...this.todos.slice(removeIndex + 1)]
      this.snackBar.open('Todo deleted', 'Close');
    });
  }

  protected readonly Status = Status;
}
