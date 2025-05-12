import { Injectable } from '@angular/core';
import { environment } from '../../environments/environmen';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageListResponse, MQMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  private apiUrl = `${environment.apiUrl}/messages`; 

  constructor(private http: HttpClient) { }

  getMessages(page: number = 0, size: number = 20): Observable<MessageListResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<MessageListResponse>(this.apiUrl, { params });
  }

  getMessageById(id: string): Observable<MQMessage> {
    return this.http.get<MQMessage>(`${this.apiUrl}/${id}`);
  }
}
