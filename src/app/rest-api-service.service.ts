import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})


export class RestApiService {
  url = 'https://restcountries.eu/rest/v2';
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.url + '/all')
}


  getCountryByCode(code) {
  
    
    return this.httpClient.get(`${this.url}/alpha/${code}`)
  }


  getCountryNameByCode(code) {
 
    return this.httpClient.get(`${this.url}/alpha/${code}?fields=name`)
  }  
 

}
