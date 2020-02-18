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
  

  //Filter on Country Name
  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'name',
      value: filterValue
    });


    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getCountries() {
 
    this.apiService.getAll().subscribe((data: Array<object>) => {
      this.countries = data;
     
      this.dataSource = new MatTableDataSource<object>(this.countries);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate =
        (data, filtersJson: string) => {
          const matchFilter = [];
          const filters = JSON.parse(filtersJson);

          filters.forEach(filter => {
            const val = data[filter.id] === null ? '' : data[filter.id];
            matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
          });
          return matchFilter.every(Boolean);
        };
    });

  }

}
