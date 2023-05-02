import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../add-dialog/dialog.component';
import { toDoModel } from '../../../../models/toDoModel';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { list: toDoModel[]; count: string },
    private toDoservice: TodoService
  ) {}

  doAction() {
    let message: string = `${this.data.count} Task(s) Deleted`;
    let idList: string[] = [];
    this.data.list.forEach((item) => {
      idList.push(item._id!);
    });
    this.toDoservice.removeTodo(idList).subscribe();
    this.dialogRef.close({ event: 'Cancel', data: message });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
