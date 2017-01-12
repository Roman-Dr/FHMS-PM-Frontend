import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BoardComponent } from './board/board.component';
import { ChartComponent } from './chart/chart.component';
import { SprintComponent } from './sprint/sprint.component';
import { EstimationComponent } from './estimation/estimation.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserStoryComponent } from './user-story/user-story.component';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import { ProjectComponent } from './project/project.component';
import { ProjectNavComponent } from './project-nav/project-nav.component';
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "./_services/auth-guard.service";
import {ProjectGuard} from "./_services/project-guard.service";
import {ProjectService} from "./_services/project.service";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    BacklogComponent,
    BoardComponent,
    ChartComponent,
    SprintComponent,
    EstimationComponent,
    RoadmapComponent,
    LoginComponent,
    RegisterComponent,
    UserStoryComponent,
    ProjectComponent,
    ProjectNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [UserService, AuthenticationService, ProjectService, AuthGuard, ProjectGuard],
  bootstrap: [AppComponent]

})
export class AppModule {

}


platformBrowserDynamic().bootstrapModule(AppModule);
