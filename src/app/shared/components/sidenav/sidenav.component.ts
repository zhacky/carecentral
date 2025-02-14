import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';


/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'sidenav-app',
  templateUrl: 'sidenav.component.html',
  styleUrl: 'sidenav.component.css',
  imports: [MatSidenavModule, MatButtonModule, MatListModule, RouterModule, MatIconModule],
  standalone: true
})
export class Sidenav {
  showFiller = false;
  isDrawerOpen = true;
}
