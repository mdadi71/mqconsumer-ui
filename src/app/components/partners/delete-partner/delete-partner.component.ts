import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-partner',
  standalone: true,
  imports: [ MatDialogModule, MatButtonModule],
  templateUrl: './delete-partner.component.html',
  styleUrl: './delete-partner.component.scss'
})
export class DeletePartnerComponent {
  readonly dialogRef = inject(MatDialogRef<DeletePartnerComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
}
