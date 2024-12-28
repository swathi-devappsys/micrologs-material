import {Component, ViewChild} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { ROUTESCONSTANT } from '../../constants/route-constants';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatToolbar,
    MatButtonModule,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatIcon,
    MatNavList,
    RouterLink,
    MatListItem,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  dashboard = ROUTESCONSTANT.DASHBOARD;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isLargeScreen = false;
  sidenavMode: 'over' | 'side' = 'over';

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Large, Breakpoints.XLarge])
      .subscribe(result => {
        this.isLargeScreen = result.matches;
        this.sidenavMode = result.matches ? 'side' : 'over';
      });
  }

  logout() {
    console.log('User logged out');
    // Implement logout logic here
  }

  protected readonly ROUTES = ROUTESCONSTANT;
  protected readonly ROUTESCONSTANT = ROUTESCONSTANT;
}
