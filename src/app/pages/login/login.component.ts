import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AppAuthService} from "../../services/app.auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {

  username = ''
  useralias = ''

  constructor(
    private authService: AppAuthService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {
  }

  ngOnInit(): void {
    this.authService.usernameObservable.subscribe(name => {
      this.username = name;
    });
    this.authService.useraliasObservable.subscribe(alias => {
      this.useralias = alias;
    });
  }

  public login() {
    this.authService.login()
    if (this.isAuthenticated()) {
      this.dialogRef.close();
    }
  }

  public logout() {
    this.authService.logout()
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated()
  }

  log(event: Event) {
    event.preventDefault()
    console.log("Hello World")
  }
}
