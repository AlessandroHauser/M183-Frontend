import {Component} from '@angular/core';
import {LoginComponent} from "./pages/login/login.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private dialog: MatDialog) {
  }

  login() {
    this.dialog.open(LoginComponent);
  }
}
