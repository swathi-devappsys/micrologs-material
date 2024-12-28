import { Routes } from '@angular/router';
import {ROUTESCONSTANT} from './constants/route-constants'
import {LoginComponent} from './ui/pages/login/login.component';
import {LayoutComponent} from './core/layout/layout.component';
import {loginGuard} from './gaurd/login/login.guard';
import {authGuard} from './gaurd/auth/auth.guard';
import {HomeComponent} from './ui/pages/home/home.component';
import {RawLogsComponent} from './ui/pages/raw-logs/raw-logs.component';
import {UploadLogsComponent} from './ui/pages/upload-logs/upload-logs.component';
export const routes: Routes = [
  {
    path:'',
    redirectTo:ROUTESCONSTANT.LOGIN,
    pathMatch:'full'
  },
  {
    path:ROUTESCONSTANT.LOGIN,
    component:LoginComponent,
    canActivate:[loginGuard]
  },
  {
  path:'',
    component:LayoutComponent,
    canActivateChild:[authGuard],
    children:[
      {
        path:ROUTESCONSTANT.DASHBOARD,
        component:HomeComponent
      },
      {
        path:ROUTESCONSTANT.RAW_LOGS,
        component:RawLogsComponent
      },
      {
        path:ROUTESCONSTANT.UPLOAD_LOGS,
        component:UploadLogsComponent
      }
    ]
  }
];
