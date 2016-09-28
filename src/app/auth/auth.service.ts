import { Injectable } from '@angular/core'
@Injectable()

export class AuthService {
  get credentials(): string {
    return localStorage.getItem('credentials');
  }

  set credentials(creds) {
    localStorage.setItem('credentials', btoa(creds));
  }
}
