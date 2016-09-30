import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild({path: 'login', component: LoginComponent})
  ],
  providers: [AuthService]
})
export class AuthModule {
  static forRoot() {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    }
  }
}
