import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  linksHistory = [] as any;

  constructor() { }

  public addLink(link: any){
    this.linksHistory.push(link);
  }

  public getLinks(){
    return of(this.linksHistory);
  }
}
