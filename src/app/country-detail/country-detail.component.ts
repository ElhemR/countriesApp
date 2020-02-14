import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { RestApiService } from '../rest-api-service.service';
import { } from 'googlemaps';
@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  private country: Array<object> = [];
  
  private countryBorders: Array<object> = [];
  @ViewChild('map',{ static: true} ) mapElement: any;
  map: google.maps.Map;
  constructor(
    private route: ActivatedRoute,
    private apiService: RestApiService) { }

  ngOnInit() {
       
    this.getCountry();
   

  }
  getProperty(value): any{
  return this.country[value];
}

  setOnMap(lat,lng) {

    const mapProperties = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

  }
  
  getCountry(): void {
    const code = this.route.snapshot.paramMap.get('code');
   
    this.apiService.getCountryByCode(code).subscribe((data: Array<object>) => {
      
      this.country = data;
      this.countryBorders = this.getBorders();
          
      this.setOnMap(this.country['latlng'][0], this.country['latlng'][1]);
   
    });
  }


  getSingleValue(value) {
  
    return this.country[value]
  }

  getCountryBorders(): Array<object> {


    return this.countryBorders;
  }
  getBorders(): Array<Object> {
    let arrayObject = []
   


    console.log(this.country['borders'].length);
    for (let i = 0; i < this.country['borders'].length; i++) {
      this.apiService.getCountryNameByCode(this.country['borders'][i]).subscribe((data) => {
       
     
        arrayObject.push({ "name": data['name'], "alpha3Code": this.country['borders'][i] } );

        

      });
     

     // arrayObject.push(this.getNameByCode(this.country[0]['borders'][i]))
    }
    return arrayObject
  }


}
