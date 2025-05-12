import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MQMessage } from '../../../models/message.model';

@Component({
  selector: 'app-message-detail',
  standalone: true,
  imports: [
    DatePipe,
    MatDialogModule
  ],
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.scss'
})
export class MessageDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MQMessage
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
