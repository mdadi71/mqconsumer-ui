import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Direction, FlowType, Partner } from '../../../../models/partner.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { PartnerService } from '../../../../services/partner.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-partner',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './add-partner.component.html',
  styleUrl: './add-partner.component.scss'
})
export class AddPartnerComponent {
  partnerForm!: FormGroup;

  directions = Object.values(Direction);
  flowTypes = Object.values(FlowType);
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private partnerService: PartnerService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.partnerForm = this.fb.group({
      alias: ['', Validators.required],
      type: ['', Validators.required],
      direction: [null as Direction | null],
      application: [''],
      processedFlowType: [null as FlowType | null],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.partnerForm.valid) {
      const newPartner: Partner = {
        ...this.partnerForm.value
      };

      console.log('Nouveau partenaire :', newPartner);
      this.partnerService.createPartner(newPartner)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.snackBar.open('Partenaire ajouté avec succès', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.partnerForm.reset();
        },
        error: err => {
          console.error('Operation failed', err);
          this.snackBar.open(`'Erreur lors de l’ajout du partenaire: ${err.error.details}`, 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
    });
      
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
