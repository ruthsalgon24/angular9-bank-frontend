import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: any = 'http://localhost:4200/api/';
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();
  userSubject: any = new BehaviorSubject<any>(null);
  user: any = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(Username: string, Password: string): any {
    this.http.post(`${this.url}login`, { Username, Password }, httpOptions).toPromise().then((res: any) => {
      if (res && res.jwt) {
        sessionStorage.setItem('jwt', res.jwt);
        this.errorSubject.next(null);
        if (res.data) {
          this.userSubject.next(res.data);
          sessionStorage.setItem('userId', res.data.ID);
        }
        this.router.navigateByUrl('/dashboard');
      } else if (res.Message) {
        this.errorSubject.next(res.Message);
      }
    });
  }

  register(Username: string, Email: string, Password: string) {
    this.http.post(`${this.url}register`, { Username, Email, Password }, httpOptions).toPromise().then((res: any) => {
      if (res && res.jwt) {
        sessionStorage.setItem('jwt', res.jwt);
        this.errorSubject.next(null);
        if (res.data) {
          this.userSubject.next(res.data);
          sessionStorage.setItem('userId', res.data.ID);
        }
        this.router.navigateByUrl('/login');
      } else if (res.Message) {
        this.errorSubject.next(res.Message);
      }
    });
  }

  getUser(): Observable<any> {
    const userId = sessionStorage.getItem('userId');
    const jwtToken = sessionStorage.getItem('jwt');
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken,
      })
    };

    return this.http.get(`${this.url}user/${userId}`, reqHeader); //get
  }

  transactions(From: Number, To: Number, Amount: Number){
    const userId = Number(sessionStorage.getItem('userId'));
    const jwtToken = sessionStorage.getItem('jwt');
    const to = Number(To);
    const from = Number(From);
    const amount = Number(Amount);
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken,
      })
    };
    this.http.post(`${this.url}transaction`, { userId, from, to, amount }, reqHeader).toPromise().then((res: any) => {
  
    });
    console.log(from);
    console.log(to);
    console.log(amount);
    console.log("transaction method");
  }

}
