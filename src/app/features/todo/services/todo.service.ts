import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { toDoModel } from 'src/app/models/toDoModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  public getTodos(user: string): Observable<toDoModel[]> {
    let params = new HttpParams();
    params = params.append('user', user);
    const options = { params: params };
    return this.http.get<toDoModel[]>(`${this.apiUrl}/todo`, options);
  }

  public addTodo(createTask: toDoModel): Observable<toDoModel> {
    return this.http.post<toDoModel>(`${this.apiUrl}/todo`, createTask);
  }

  public removeTodo(toDoList: string[]): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(`${this.apiUrl}/todo`, {
      body: toDoList,
    });
  }

  public markAsDone(toDoList: toDoModel[]): Observable<toDoModel[]> {
    return this.http.patch<toDoModel[]>(`${this.apiUrl}/todo`, toDoList);
  }
}
