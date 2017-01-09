import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Backlog} from './backlog';
import {BacklogDataService} from '../_services/backlog-data.service';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  providers: [BacklogDataService]
})
export class BacklogComponent {


  constructor(private backlogDataService: BacklogDataService, private  userService: UserService) {
  }

  backlogitemTitle:string;
  backlogitemState:string;
  backlogitemAuthor:string;
  backlogitemDescription:string;

  backlogitems: Backlog[];
  users: User;
  errorMessage: string;

  removeBacklogitem(backlogitem){
    console.log("Component: "+backlogitem._id)
    this.backlogDataService.deleteBacklogitem(backlogitem._id).subscribe(
      data => {
        this.loadBacklogitems()
      }
    );
  }

  loadBacklogitems(){
    this.backlogDataService.getBacklogitems()
      .subscribe(
        backlogitems=>this.backlogitems=backlogitems,
        err => {console.log(err);
        });
  }

  ngOnInit(){
    this.loadBacklogitems()
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any> error
      )
  }

  addBacklogitem() {
    if((!this.backlogitemTitle)||(!this.backlogitemAuthor)||(!this.backlogitemDescription)){
      console.log("BacklogTitle("+this.backlogitemTitle+") oder BacklogAuthor("+this.backlogitemAuthor+") oder BacklogDescription("+this.backlogitemDescription+") sind leer: Component Backlog")
      this.backlogitemTitle=null
      this.backlogitemAuthor=null
      this.backlogitemDescription=null
    }
    else{
      console.log("1")
      this.backlogDataService.postBacklogitemRestful( this.backlogitemTitle,this.backlogitemState,this.backlogitemAuthor,this.backlogitemDescription).subscribe(
        //data => this.postMyUserStoriesToServer = JSON.stringify(data),
        data => {
          this.loadBacklogitems()
        }
      );
      this.backlogitemTitle=null
      this.backlogitemAuthor=null
      this.backlogitemDescription=null
    }
  }

}
