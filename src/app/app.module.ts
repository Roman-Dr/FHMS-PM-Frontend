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
import {ChartComponent} from './chart/chart.component';
//


//
// SERVICES -> Providers
//
import {AuthGuard, ProjectGuard} from "./_services/index";
import {AuthenticationService, UserService ,ProjectService, BacklogDataService, SprintService, TaskService, UserStoryDataService } from "./_services/index";
//


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    BacklogItemComponent, BacklogItemsComponent,
    BoardComponent,
    SprintComponent,
    EstimationComponent,
    RoadmapComponent,
    LoginComponent,
    RegisterComponent,
    UserStoryComponent,
    ProjectComponent, ProjectsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DragulaModule,
    DatePickerModule,
    Ng2PaginationModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthenticationService,
    UserService,
    ProjectService,
    BacklogDataService,
    SprintService,
    TaskService,
    UserStoryDataService,

    AuthGuard,
    ProjectGuard
  ],
  bootstrap: [AppComponent]

})
export class AppModule {

}


platformBrowserDynamic().bootstrapModule(AppModule);
