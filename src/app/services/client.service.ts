import {Injectable} from '@angular/core';
import {Todo} from "../entities/Todo";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = 'http://localhost:4200/api';

  constructor(private http: HttpClient) {

  }

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url + '/todos');
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url + '/postTodo', JSON.stringify(todo));
  }

  public deleteTodo(id: number): Observable<Object> {
    return this.http.delete(this.url + '/deleteTodo/' + id);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.url + '/updateTodo' + todo.id, JSON.stringify(todo));
  }
}
