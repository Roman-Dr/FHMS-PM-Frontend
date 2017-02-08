import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";
import {routes} from './app.router'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {Ng2PaginationModule} from "ng2-pagination";
import {DragulaModule} from "ng2-dragula";

import {ChartsModule} from "../assets/addon/ng2-charts";

import {AppComponent} from './app.component';

//
// COMPONENTS -> Declarations
//
import {LandingComponent} from './landing/landing.component';
import {BacklogItemComponent, BacklogItemsComponent} from './backlog/index';
import {BoardComponent} from './board/board.component';
import {SprintComponent, SprintCapacityComponent, SprintRetrospectiveComponent} from './sprint/index';
import {EstimationComponent} from './estimation/estimation.component';
import {RoadmapComponent} from './roadmap/roadmap.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserStoryComponent} from './user-story/user-story.component';
import {ProjectsComponent, ProjectComponent} from './project/index';
import {PlanningPokerComponent,PlanningPokerGameComponent} from './planningPoker/index';
import {ChartComponent} from './chart/chart.component';
import {AdminComponent} from './admin/admin.component';
//


//
// SERVICES -> Providers
//
import {CustomErrorHandler} from "./global-error.handling";
import {AuthGuard, ProjectGuard, NavigationLockGuard} from "./_services/index";
import {AuthenticationService, UserService ,ProjectService, SprintService } from "./_services/index";
//


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    BacklogItemComponent, BacklogItemsComponent,
    BoardComponent,
    SprintComponent,
    SprintCapacityComponent,
    SprintRetrospectiveComponent,
    EstimationComponent,
    RoadmapComponent,
    LoginComponent,
    RegisterComponent,
    UserStoryComponent,
    ProjectComponent, ProjectsComponent,
    PlanningPokerComponent, PlanningPokerGameComponent,
    ChartComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DragulaModule,
    Ng2PaginationModule,
    ChartsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthenticationService,
    UserService,
    ProjectService,
    AuthGuard,
    NavigationLockGuard,
    ProjectGuard,
    {provide: ErrorHandler, useClass: CustomErrorHandler}
  ],
  bootstrap: [AppComponent]

})
export class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
