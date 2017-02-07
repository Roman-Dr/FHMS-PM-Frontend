import {LandingComponent} from './landing/landing.component';
import {BacklogItemComponent, BacklogItemsComponent} from './backlog/index';
import {BoardComponent} from './board/board.component';
import {SprintComponent, SprintCapacityComponent, SprintRetrospectiveComponent} from './sprint/index';
import {EstimationComponent} from './estimation/estimation.component';
import {ChartComponent} from './chart/chart.component';
import {RoadmapComponent} from './roadmap/roadmap.component';
import {UserStoryComponent} from './user-story/user-story.component';
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {ProjectComponent,ProjectsComponent} from "./project/index";
import {PlanningPokerComponent, PlanningPokerGameComponent} from "./planningPoker/index";
import {AdminComponent} from "./admin/admin.component";

import {AuthGuard, ProjectGuard, NavigationLockGuard} from "./_services/index";

export const routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard, NavigationLockGuard]},
  {path: 'projects/:projectId', component: ProjectComponent, canActivate: [AuthGuard, NavigationLockGuard]},
  {path: '', component: LandingComponent, pathMatch: 'full', canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'landing', component: LandingComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'backlog', component: BacklogItemsComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'backlog/:backlogItemId', component: BacklogItemComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'board', component: BoardComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'sprints', component: SprintComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'sprints/:sprintId/backlog', component: BacklogItemsComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'sprints/:sprintId/sprintcapacities', component: SprintCapacityComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'sprints/:sprintId/sprintretrospective', component: SprintRetrospectiveComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'estimation', component: EstimationComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'planningPoker', component: PlanningPokerComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'planningPoker/game/:planningPokerId', component: PlanningPokerGameComponent, canActivate: [AuthGuard, ProjectGuard]},
  {path: 'chart', component: ChartComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'roadmap', component: RoadmapComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'user-story', component: UserStoryComponent, canActivate: [AuthGuard, ProjectGuard, NavigationLockGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, NavigationLockGuard]},
];

