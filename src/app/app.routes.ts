import { Routes } from '@angular/router';
import { MessageListComponent } from './components/messages/message-list/message-list.component';
import { PartnerComponent } from './components/partner/partner.component';

export const routes: Routes = [
    { path: '', redirectTo: 'messages', pathMatch: 'full' },
  { path: 'messages', component: MessageListComponent }, 
  { 
    path: 'partners', 
    children: [
      { path: '', component: PartnerComponent }
    ]
  },
  { path: '**', redirectTo: '/messages' }
];
