/**
 * Created by David on 04.02.2017.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AdminService, ProjectService, AuthenticationService} from "../_services/index";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  providers: [AdminService]
})
export class AdminComponent implements OnInit {

  displayName: string = "Administration";

  isBusy: boolean = false;

  constructor(private router: Router,
              private adminService: AdminService,
              private projectService: ProjectService,
              private authenticationService: AuthenticationService) {

  }

  ngOnInit() {

  }

  initializeDatabase() {
    this.isBusy = true;
    this.adminService.initializeDatabase().subscribe(x => {
      this.isBusy = false;
      if(x) {
        this.authenticationService.logout()
          .subscribe(x => {}, err => {}, ()=> this.router.navigate(['login']));
      }
    });
  }
}
