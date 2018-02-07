import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import { AuthService } from '../user/auth.service';

@Injectable()
export class DataService {
  dataEdited = new BehaviorSubject<boolean>(false);
  dataIsLoading = new BehaviorSubject<boolean>(false);
  dataLoadFailed = new Subject<boolean>();
  constructor(private http: Http,
              private authService: AuthService) {
  }

  getToken(): string {
    return this.authService.getAuthenticatedUser().getSession((err, session) => {
   return  session.getAccessToken().getJwtToken();
  });
    }

  getProductByBarcode(barcode: string, token:string) :Observable<any> {
      const queryParam = '?accessToken=' + token+'&barcode='+barcode
  
    return  this.http.get('https://6delragta4.execute-api.us-west-2.amazonaws.com/Prod/getproductbybarcode/'  + queryParam, {
        headers: new Headers({'Authorization': token})
      })
        .map(
          (response: Response) => response.json()
        );
    }
  
  onDeleteData() {
    this.dataLoadFailed.next(false);
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      this.http.delete('https://API_ID.execute-api.REGION.amazonaws.com/dev/compare-yourself/?accessToken=XXX', {
        headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
      })
        .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => this.dataLoadFailed.next(true)
        );
    });
  }
}
