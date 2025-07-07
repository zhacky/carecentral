import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {DashboardItemComponent} from '../dashboard-item/dashboard-item.component';

@Component({
  selector: 'app-quick-links',
  imports: [
    RouterLink,
    DashboardItemComponent
  ],
  templateUrl: './quick-links.component.html',
  styleUrl: './quick-links.component.css'
})
export class QuickLinksComponent {

}
