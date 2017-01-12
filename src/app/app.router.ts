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
import {ProjectComponent} from "./project/project.component";
import {AuthGuard} from "./_services/auth-guard.service";

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'projects', component: ProjectComponent, canActivate: [AuthGuard]},
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'backlog', component: BacklogComponent, canActivate: [AuthGuard]},
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'sprints', component: SprintComponent, canActivate: [AuthGuard] },
  { path: 'estimation', component: EstimationComponent, canActivate: [AuthGuard] },
  { path: 'chart', component: ChartComponent, canActivate: [AuthGuard] },
  { path: 'roadmap', component: RoadmapComponent, canActivate: [AuthGuard] },
  { path: 'user-story', component: UserStoryComponent, canActivate: [AuthGuard] },
];

