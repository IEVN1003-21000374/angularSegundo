import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },
  {
    path: 'formularios',
    loadChildren: () => import('./formularios/formularios.routes'), // Asegúrate de que sea el módulo correcto
  },
];

