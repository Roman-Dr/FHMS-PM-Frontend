import {LandingComponent} from './landing/landing.component';
import {BacklogItemComponent, BacklogItemsComponent} from './backlog/index';
import {BoardComponent} from './board/board.component';
import {SprintComponent} from './sprint/sprint.component';
import {EstimationComponent} from './estimation/estimation.component';
import {ChartComponent} from './chart/chart.component';
import {RoadmapComponent} from './roadmap/roadmap.component';
import {UserStoryComponent} from './user-story/user-story.component';
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {ProjectComponent,ProjectsComponent} from "./project/index";
import {SprintCapacityComponent} from "./sprint/sprintCapacity.component";
import {AuthGuard} from "./_services/auth-guard.service";
import {ProjectGuard} from "./_services/project-guard.service";


export const routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  {path: 'projects/:projectId', component: ProjectComponent, canActivate: [AuthGuard]},
  {path: 'landing', component: LandingComponent, canActivate: [AuthGuard, ProjectGuard]},
  {path: 'backlog', component: BacklogItemsComponent, canActivate: [AuthGuard, ProjectGuard]},
  {path: 'backlog/:backlogItemId', component: BacklogItemComponent, canActivate: [AuthGuard, ProjectGuard]},
  {path: 'board', component: BoardComponent, canActivate: [AuthGuard, ProjectGuard]},
  {path: 'sprints', component: SprintComponent, canActivate: [AuthGuard, ProjectGuard]},
  {path: 'sprints/:sprintId/backlog', component: BacklogItemsComponent, canActivate: [AuthGuard, ProjectGuard]},
  {path: 'sprints/:sprintId/sprintcapacities', component: SprintCapacityComponent, canActivate: [AuthGuard, ProjectGuard]},
  {path: 'estimation', component: EstimationComponent, canActivate: [AuthGuard, ProjectGuard]},
  {path: 'chart', component: ChartComponent, canActivate: [AuthGuard, ProjectGuard]},
  {path: 'roadmap', component: RoadmapComponent, canActivate: [AuthGuard, ProjectGuard]},
  {path: 'user-story', component: UserStoryComponent, canActivate: [AuthGuard, ProjectGuard]},
];

