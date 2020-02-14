import { Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from '../rest-api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent implements OnInit {
  displayedColumns: string[] = ['flag', 'name', 'population'];
  private countries: Array<object> = [];
  dataSource = new MatTableDataSource<object>(this.countries);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private apiService: RestApiService) { }

  ngOnInit() {
    this.getCountries();

 
  }
  


  public getCountries() {
 
    this.apiService.getAll().subscribe((data: Array<object>) => {
      this.countries = data;
     
      this.dataSource = new MatTableDataSource<object>(this.countries);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });

  }

}
