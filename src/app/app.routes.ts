import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      redirectTo: '/item', pathMatch: 'full' },
  { path: 'item', loadChildren: () => System.import('./item')},
  { path: '**',    component: NoContent },
];
