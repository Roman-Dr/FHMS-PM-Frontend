import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";
import {routes} from './app.router'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {Ng2PaginationModule} from "ng2-pagination";
import {DragulaModule} from "ng2-dragula";
import {DatePickerModule} from "ng2-datepicker";
import {ChartsModule} from "ng2-charts";

import {AppComponent} from './app.component';

//
// COMPONENTS -> Declarations
//
import {LandingComponent} from './landing/landing.component';
import {BacklogItemComponent, BacklogItemsComponent} from './backlog/index';
import {BoardComponent} from './board/board.component';
import {SprintComponent} from './sprint/sprint.component';
import {EstimationComponent} from './estimation/estimation.component';
import {RoadmapComponent} from './roadmap/roadmap.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserStoryComponent} from './user-story/user-story.component';
import {ProjectsComponent, ProjectComponent} from './project/index';
import {PlanningPokerComponent} from './planningPoker/index';
import {SprintCapacityComponent} from "./sprint/sprintCapacity.component";
import {ChartComponent} from './chart/chart.component';
//


//
// SERVICES -> Providers
//
import {AuthGuard, ProjectGuard} from "./_services/index";
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
    EstimationComponent,
    RoadmapComponent,
    LoginComponent,
    RegisterComponent,
    UserStoryComponent,
    ProjectComponent, ProjectsComponent,
    PlanningPokerComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DragulaModule,
    DatePickerModule,
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
    ProjectGuard
  ],
  bootstrap: [AppComponent]

})
export class AppModule {

}


platformBrowserDynamic().bootstrapModule(AppModule);
