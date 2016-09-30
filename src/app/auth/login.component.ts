import { Component } from '@angular/core';
@Component({
  templateUrl: './login.html'
})
export class LoginComponent {
  login(shit) {
    console.log(shit);
    return false;
  }
}
