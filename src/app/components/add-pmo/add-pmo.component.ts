import { Component, OnInit,ViewChild } from '@angular/core';
import {AdminService} from '../../services/admin.service';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-add-pmo',
  templateUrl: './add-pmo.component.html',
  styleUrls: ['./add-pmo.component.css']
})
export class AddPmoComponent implements OnInit {

  id:string;
  submitted=false;
  message:string='';

  associateId:any[];
  
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private adminService:AdminService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      processing: true,
      dom       : 'Bfrtip',
    }
    this.populateTable();
  }
  populateTable(){
     this.adminService.ListRoleEmp("PMO")
     .subscribe(data => {
       this.associateId = data;
     });
   }
   ngOnDestroy(): void {
     this.dtTrigger.unsubscribe();
   }
   newCustomer(): void {
     this.submitted = false;
   }
   rerender(): void {
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();     
    });
   }

  revoke(role:string,id:string){
    this.adminService.RevokeRoleEmp(role,id)
    .subscribe(data => {
      if(data=0){
        alert("Id Not Exists As PMO");
      }else{
        this.message="";//"Updated Successfully"
        alert("Role Revoked Successfully");
        this.populateTable();
      }
      this.id="";
      }, error => {
        console.log("Error :"+error);
        this.message="Error";
        this.id="";
    });
  }

  save() {
   this.adminService.createPMO(this.id)
     .subscribe(data => {
       console.log("data: "+data)
        if(data=='0'){
          this.message="Id Already Exists";
        }else{
          this.message="";//"Updated Successfully"
          alert("Updated Successfully");
          this.populateTable();
        }
        this.id="";
      }, error => {
        console.log("Error :"+error);
        this.message="Error Occurred";
        this.id="";
    });
  }

  onSubmit() {
    if(this.id===undefined || this.id==="" || this.id===null){
      alert("Please enter valid Employee ID");
    }
    else{
      this.submitted = true;
      this.save();
    }
  }
}
