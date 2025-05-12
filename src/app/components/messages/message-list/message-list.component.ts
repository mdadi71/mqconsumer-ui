import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MessageService } from '../../../services/message.service';
import { Subject, takeUntil } from 'rxjs';
import { MQMessage } from '../../../models/message.model';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MessageDetailComponent } from '../message-detail/message-detail.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule, 
    DatePipe,
    MatDialogModule
  ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  displayedColumns: string[] = ['messageId', 'messageContent', 'correlationId', 'messageTimestamp'];
  dataSource = new MatTableDataSource<MQMessage>();
  pagination = {
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    pageSize: 20
  };
  isLoading = false;
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private messageService: MessageService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(pageIndex: number = 0, pageSize: number = 10) {
    this.isLoading = true;

    this.isLoading = true;
    this.messageService.getMessages(pageIndex, pageSize)
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
          console.error('Error loading messages', err);
          this.isLoading = false;
        }
    });
    
  }

  onPageChange(event: PageEvent) {
    this.loadData(event.pageIndex, event.pageSize);
  }

  getMessageDetails(messageId: string): void {
    this.messageService.getMessageById(messageId)
    .pipe(takeUntil(this.destroy$))
    .subscribe( {
      next: (response: MQMessage) => {
        this.dialog.open(MessageDetailComponent, {
          data: response,
          width: '800px'
        });
      },
      error: (err) => {
        console.error('Error loading messages', err);
        this.isLoading = false;
      }
    })
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();  
  }

}
