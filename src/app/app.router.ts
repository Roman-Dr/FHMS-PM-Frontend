import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BoardComponent } from './board/board.component';
import { SprintComponent } from './sprint/sprint.component';
import { EstimationComponent } from './estimation/estimation.component';
import { ChartComponent } from './chart/chart.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { UserStoryComponent} from './user-story/user-story.component';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { LoggedInGuard } from './_guards/logged-in.guard';

export const router: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'backlog', component: BacklogComponent, canActivate: [LoggedInGuard] },
  { path: 'board', component: BoardComponent },
  { path: 'sprint', component: SprintComponent },
  { path: 'estimation', component: EstimationComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'roadmap', component: RoadmapComponent },
  { path: 'user-story', component: UserStoryComponent }

  // { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
