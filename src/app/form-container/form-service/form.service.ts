import { Member } from './../models/member.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormService {

  private apiUrl = 'http://localhost:3000/members';

  isPersonal$ = new Subject<any>();
  isAddress$ = new Subject<any>();
  isContact$ = new Subject<any>();


  constructor(private httpClient: HttpClient) {

  }

  /**
   * get all the members from db.json
   */
  getMembers(): Observable<[]> {
    return this.httpClient.get<[]>(this.apiUrl).pipe(map(response => response));
  }

  /**
   * add a new member data to the json
   * @param iMember => member list
   */
  addNewMember(iMember: Member): Observable<Member> {
    return this.httpClient.post<Member>(this.apiUrl, iMember, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

}
