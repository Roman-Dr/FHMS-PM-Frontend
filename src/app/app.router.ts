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
import { LoggedInGuard } from './logged-in.guard'

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'backlog', component: BacklogComponent },
  { path: 'board', component: BoardComponent },
  { path: 'sprint', component: SprintComponent },
  { path: 'estimation', component: EstimationComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'roadmap', component: RoadmapComponent },
  { path: 'user-story', component: UserStoryComponent },

  // { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] }
];

