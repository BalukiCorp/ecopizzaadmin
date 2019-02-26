import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }
  async login(email: string, password: string) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/petition']);
    }).catch(() => {
      alert('Email o contraseña incorrecta');
    });

  }
  async sendPasswordResetEmail(passwordResetEmail: string ) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }
  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  get isLoggedIn(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}
