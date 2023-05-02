import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  public newTask: string;
  public category: string;
  task = new FormControl(null, [Validators.required]);
  categoryInput = new FormControl(null);
  addFormGroup = new FormGroup({
    task: this.task,
    category: this.categoryInput,
  });

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {
    this.newTask = '';
    this.category = '';
  }

  public ngOnInit(): void {}

  doAction() {
    this.dialogRef.close({
      event: 'this.action',
      data: {
        task: this.addFormGroup.controls.task.value,
        category: this.addFormGroup.controls.category.value,
      },
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
