import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatListOption } from '@angular/material/list';
import { toDoModel } from 'src/app/models/toDoModel';
import { DialogComponent } from '../components/add-dialog/dialog.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { TodoService } from '../services/todo.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Output() loading = new EventEmitter<boolean>();
  public data: toDoModel[];
  public categories: string[];
  public user: string;
  private selected: MatListOption[];
  //public loading: boolean;

  constructor(
    private ToDoservice: TodoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private token: TokenStorageService
  ) {
    this.data = [];
    this.categories = [];
    this.user = '';
    this.selected = [];
  }

  public ngOnInit(): void {
    this.loading.emit(true);
    this.getData();
    this.loading.emit(false);
  }

  private getData(): void {
    this.user = this.token.getUser().username;
    this.ToDoservice.getTodos(this.user).subscribe((data) => {
      if (this.data) {
        this.data = data;
        data.forEach((toDO) => {
          if (
            toDO.category != null &&
            !this.categories.includes(toDO.category)
          ) {
            this.categories.push(toDO.category);
          }
        });

        this.categories.sort();
      }
    });
  }

  public openDialog(): void {
    const dia = this.dialog.open(DialogComponent, {
      width: '350px',
      restoreFocus: false,
      panelClass: 'dialog-cust',
    });

    dia.afterClosed().subscribe((result) => {
      this.loading.emit(true);
      if (result.data) {
        this.addTask(result.data.task, this.user, result.data.category);
      }
      this.loading.emit(false);
    });
  }

  public openConfirmDialog(): void {
    let finalList: string[] = [];

    this.selected.forEach((selected) => {
      finalList.push(selected.value);
    });

    const dia = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      restoreFocus: false,
      panelClass: 'dialog-cust',
      data: {
        list: finalList,
        count: this.selected.length.toString(),
      },
    });

    dia.afterClosed().subscribe((result) => {
      this.loading.emit(true);
      if (result.data) {
        this.snackBar.open(result.data, 'Dismiss', {
          duration: 5000,
        });
        this.getData();
        this.loading.emit(false);
      }
    });
  }

  public addTask(task: string, user: string, category: string) {
    if (category === null) category = 'Misc';
    this.loading.emit(true);

    const add: toDoModel = {
      item: task,
      user: user,
      done: false,
      category: category,
    };

    this.ToDoservice.addTodo(add).subscribe((data) => {
      if (data) {
        this.snackBar.open('Added New Task!', 'Dismiss', {
          duration: 5000,
        });
        this.getData();
        this.loading.emit(false);
      }
    });
  }

  public changeSelectedOptions(options: MatListOption[]) {
    this.selected = options;
  }

  public markAsDone(options: MatListOption[]) {
    this.loading.emit(true);
    let finalList: toDoModel[] = [];

    options.forEach((option) => {
      const toDO: toDoModel = {
        _id: option.value._id,
        item: option.value.item,
        user: option.value.user,
        done: true,
      };

      finalList.push(toDO);
    });

    this.ToDoservice.markAsDone(finalList).subscribe();
    this.getData();
    this.loading.emit(false);
  }
}
