import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Maycon Software | Home'
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog-list/blog-list.component').then(m => m.BlogListComponent),
    title: 'Blog | Maycon Software'
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/blog/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent),
    title: 'Post | Maycon Software'
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio.component').then(m => m.PortfolioComponent),
    title: 'Portfolio | Maycon Software'
  },
  {
    path: 'floor-plan',
    loadComponent: () => import('./features/floor-plan/floor-plan.component').then(m => m.FloorPlanComponent),
    title: 'Smart Home | Maycon Software'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
