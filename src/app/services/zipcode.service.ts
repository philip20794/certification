import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZipcodeService {


  constructor() {}

  getZipcodes(): Array<number> {
    const storage = JSON.parse(localStorage.getItem('zipcodes'));
    return storage ? storage : [] ;
  }

  saveZipcode(zipcode: number): void {
    const zipcodes = this.getZipcodes();
    zipcodes.push(zipcode);
    localStorage.setItem('zipcodes', JSON.stringify(zipcodes));
  }

  removeZipcode(zipcode: number): void {
    const zipcodes = this.getZipcodes();
    const index = zipcodes.indexOf(zipcode);
    if (index > -1 ) {
      zipcodes.splice(index, 1);
      localStorage.setItem('zipcodes', JSON.stringify(zipcodes));
    }
  }

}
