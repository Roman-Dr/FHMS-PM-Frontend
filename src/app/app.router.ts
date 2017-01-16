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
import {AuthenticationService} from "./_services/authentication.service"
import {ProjectService} from "./_services/project.service"

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'projects', component: ProjectComponent, canActivate: [AuthenticationService]},
  { path: 'landing', component: LandingComponent, canActivate: [AuthenticationService, ProjectService] },
  { path: 'backlog', component: BacklogComponent, canActivate: [AuthenticationService, ProjectService]},
  { path: 'board', component: BoardComponent, canActivate: [AuthenticationService, ProjectService] },
  { path: 'sprints', component: SprintComponent, canActivate: [AuthenticationService, ProjectService] },
  { path: 'estimation', component: EstimationComponent, canActivate: [AuthenticationService, ProjectService] },
  { path: 'chart', component: ChartComponent, canActivate: [AuthenticationService, ProjectService] },
  { path: 'roadmap', component: RoadmapComponent, canActivate: [AuthenticationService, ProjectService] },
  { path: 'user-story', component: UserStoryComponent, canActivate: [AuthenticationService, ProjectService] }
];

