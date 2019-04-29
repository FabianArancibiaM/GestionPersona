import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';


declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService : EmployeeService) {

  }

  ngOnInit() {
    this.getEmployee();
  }

  addEmployee(form?:NgForm){
    console.log(form.value);
    console.log(form.value.id);
    
    
    if(form.value.id){
      this.employeeService.putEmployees(form.value)
        .subscribe(res=>{
          this.resetForm(form);
          M.toast({html: 'Se guardo correctamente'});
          this.getEmployee();
        });
    }else{
      if(form){
        this.employeeService.postEmployees(form.value)
          .subscribe(res=>{
            this.resetForm(form);
            M.toast({html: 'Se guardo correctamente'});
            this.getEmployee();
          });
      }
    }
  }

  

  getEmployee(){
    this.employeeService.getEmployees()
        .subscribe(res=>{
          this.employeeService.employees = res as Employee[];
          console.log(res)
        });
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployeed = employee;

  }

  deleteEmployee(id:string){
    if(confirm('Esta seguro que quiere eliminarlo?')){
      this.employeeService.deleteEmployees(id)
      .subscribe(res => {
        M.toast({html: 'Se elimino correctamente'});
        this.getEmployee();
      });
    }    
  }

  resetForm(form?:NgForm){
    if(form){
      form.reset();
      this.employeeService.selectedEmployeed = new Employee();
    }
  }

}
