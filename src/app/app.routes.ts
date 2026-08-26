import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/portfolio/portfolio').then((m) => m.Portfolio),
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios').then((m) => m.Usuarios),
  },
  { path: '**', redirectTo: '' },
];
