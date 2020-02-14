import { TestBed, inject} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RestApiService } from './rest-api-service.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
describe('RestApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestApiService],
      imports: [HttpClientTestingModule]
    });
  });
  it(
    'should get countries',
    inject(
      [HttpTestingController, RestApiService],
      (httpMock: HttpTestingController, restService: RestApiService) => {
        const mockCountries = [
          { name: 'Tunisia', alpha3Code: 'TUN' },
          { name: 'Germany', website: 'DEU' }
        ];

        restService.getAll().subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(mockCountries);
          }
        });

        const mockReq = httpMock.expectOne(restService.url+'/all');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockCountries);

        httpMock.verify();
      }
    )
  );
  it(
    'should get country by code',
    inject(
      [HttpTestingController, RestApiService],
      (httpMock: HttpTestingController, restService: RestApiService) => {
        const mockCountries = [
          { name: 'Tunisia', alpha3Code: 'TUN' },
          { name: 'Germany', website: 'DEU' }
        ];

        restService.getCountryByCode('DEU').subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(mockCountries[1]);
          }
        });

        const mockReq = httpMock.expectOne(restService.url + '/alpha/DEU');

        expect(mockReq.cancelled).toBeFalsy();
    
        mockReq.flush(mockCountries[0]);

        httpMock.verify();
      }
    )
  );
  it(
    'should get country name by code',
    inject(
      [HttpTestingController, RestApiService],
      (httpMock: HttpTestingController, restService: RestApiService) => {
        const mockUsers = [
          { name: 'Tunisia', alpha3Code: 'TUN' },
          { name: 'Germany', website: 'DEU' }
        ];

        restService.getCountryNameByCode('DEU').subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(mockUsers[1]);
          }
        });

        const mockReq = httpMock.expectOne(restService.url + '/alpha/DEU?fields=name');

        expect(mockReq.cancelled).toBeFalsy();

        mockReq.flush(mockUsers[0]);

        httpMock.verify();
      }
    )
  );
  it('should be created', () => {
    const service: RestApiService = TestBed.get(RestApiService);
    expect(service).toBeTruthy();
  });
});
