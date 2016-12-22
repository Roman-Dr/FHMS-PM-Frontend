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


export const router: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'backlog', component: BacklogComponent },
  { path: 'board', component: BoardComponent },
  { path: 'sprint', component: SprintComponent },
  { path: 'estimation', component: EstimationComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'roadmap', component: RoadmapComponent },
  { path: 'user-story', component: UserStoryComponent } 
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
