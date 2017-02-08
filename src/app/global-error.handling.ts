import {ErrorHandler, Injector, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Response} from "@angular/http";
import {AuthenticationService} from "./_services/authentication.service";

/**
 * Created by David on 08.02.2017.
 */
@Injectable()
export class CustomErrorHandler extends ErrorHandler {

  private router: Router;
  private authenticationService: AuthenticationService;

  constructor(private injector: Injector) {
    super(true);

    this.router = injector.get(Router);
    this.authenticationService = injector.get(AuthenticationService);
  }

  handleError(error) {
    if (error.status && error.status == 401) {
      console.log("Automatic logout and redirect!");
      this.authenticationService.logout().subscribe(() => {
        this.router.navigate(['login']);
      });
    }
    super.handleError(error);
  }
}
