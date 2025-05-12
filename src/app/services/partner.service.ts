import { Injectable } from '@angular/core';
import { environment } from '../../environments/environmen';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Partner, PartnerListResponse } from '../models/partner.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private apiUrl = `${environment.apiUrl}/partners`; 
  constructor(private http: HttpClient) { }

  getPartners(page: number = 0, size: number = 20): Observable<PartnerListResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PartnerListResponse>(this.apiUrl, { params });
  }

  createPartner(partner: Partner): Observable<Partner> {
    return this.http.post<Partner>(this.apiUrl, partner);
  }

  deletePartner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
