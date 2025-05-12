import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Partner } from '../../../models/partner.model';
import { Subject, takeUntil } from 'rxjs';
import { PartnerService } from '../../../services/partner.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AddPartnerComponent } from '../add-partner/add-partner/add-partner.component';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule, 
    DatePipe,
    MatDialogModule,
    MatIconModule,
    AddPartnerComponent
  ],
  templateUrl: './partner-list.component.html',
  styleUrl: './partner-list.component.scss'
})
export class PartnerListComponent {
  displayedColumns: string[] = ['alias', 'type', 'direction', 'application', 'processedFlowType', 'description'];
  dataSource = new MatTableDataSource<Partner>();
  pagination = {
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    pageSize: 20
  };
  isLoading = false;
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private partnerService: PartnerService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(pageIndex: number = 0, pageSize: number = 10): void {
    this.isLoading = true;

    this.isLoading = true;
    this.partnerService.getPartners(pageIndex, pageSize)
      .pipe(takeUntil(this.destroy$)) 
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.content;
          this.pagination = {
            currentPage: response.pageNumber,
            totalItems: response.totalElements,
            totalPages: response.totalPages,
            pageSize: response.pageSize
          };
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading partners', err);
          this.isLoading = false;
        }
    });
    
  }

  onPageChange(event: PageEvent): void {
    this.loadData(event.pageIndex, event.pageSize);
  }

  deletePartner(id: number): void {

  }
}
