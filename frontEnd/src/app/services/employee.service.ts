import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployeed: Employee;
  employees: Employee[];
  readonly URL_API = 'http://localhost:3000/api/employee';

  constructor(private http:HttpClient) { 
    this.selectedEmployeed = new Employee();
  }

  getEmployees(){
    return this.http.get(this.URL_API+'/');
  }
  postEmployees(employee:Employee){
    return this.http.post(this.URL_API+'/',employee);
  }
  putEmployees(employee:Employee){
    return this.http.put(this.URL_API+`/${employee.id}`,employee);
  }
  deleteEmployees(id:string){
    return this.http.delete(this.URL_API+`/${id}`);
  }
}
