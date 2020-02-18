import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { AdminService } from 'src/app/services/admin.service';
import { FeedbackStatus } from 'src/app/models/FeedbackStatus';

import { MailList } from 'src/app/models/MailList';
import { Response } from 'src/app/models/Response'

import { FormGroup, FormBuilder, FormArray, FormControl} from '@angular/forms';
import { HeaderComponent } from 'src/app/components/shared/header/header.component';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements AfterViewInit, OnDestroy, OnInit {

  selectedValue: string = '';
  selected:string='none';
  //change model
  feedbackReport: FeedbackStatus[];
  check: boolean = true;
  
  mailList: MailList = { eventId: "", employeeId: "", volType: "",category:"" };
  response: Response = { message: "", httpStatus: 0 };
  
 // myForm: FormGroup;

  myForm = new FormGroup({
    eventId: new FormControl(),
 });
 
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private adminService: AdminService,private fb: FormBuilder,private header:HeaderComponent) {
  }

  selectChangeHandler(event: any) {
    this.selectedValue = event.target.value;
    this.populateData();
  }
  populateData(){
    this.selected='block';
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
    });

    var role = localStorage.getItem('role');
    var ascid = "";
    if (role == "ROLE_POC")
      ascid = localStorage.getItem('id');

    //change service call
    this.adminService.getReport(this.selectedValue, ascid)
      .subscribe(
        data => {
          this.feedbackReport = data;
          this.dtTrigger.next();
        });
  }
  ngOnInit() {
    this.dtOptions = {
        pagingType: 'full_numbers',
     // pageLength: 5,
     // processing: true,
      /*dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ]*/
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onSubmit() {
    if(this.feedbackReport===undefined){
      return false;
    }
    let ary:any[]=this.feedbackReport;
    var type  = ((document.getElementById("inputGroupSelect01") as HTMLInputElement).value);
 
    for(let i=0;i<ary.length;i++)
    {
      if(((document.getElementById("chk"+i) as HTMLInputElement).checked)===true){
        this.mailList.eventId   =(document.getElementById("event"+i) as HTMLInputElement).value;
        this.mailList.employeeId=(document.getElementById("employee"+i) as HTMLInputElement).value;
        this.mailList.volType   =type;
        this.adminService.sentMail(this.mailList)
          .subscribe((data: Response) => {
            this.response.message = data.message;
            this.response.httpStatus = data.httpStatus;
        });
      }
    }
  }

  selectAll(){
    if(this.feedbackReport===undefined){
      return false;
    }
    var status=(document.getElementById("chkAll") as HTMLInputElement).checked;
    if(status===true){     this.chk(true);   }
    else{ this.chk(false); }
  }
  chk(val){
    let ary:any[]=this.feedbackReport;
    for(let i=0;i<ary.length;i++)
    {
      var chk=(document.getElementById("chk"+i) as HTMLInputElement);
      chk.checked=val;
    }
  }
  mail(event,employee,category){  
    this.header.loader("block");
    var typeSel  = ((document.getElementById("inputGroupSelect01") as HTMLInputElement).value);
    this.mailList.eventId   =event;
    this.mailList.employeeId=employee;
    this.mailList.volType   =typeSel;
    this.mailList.category   =category;

    //alert(this.mailList.eventId+" "+this.mailList.employeeId+" "+this.mailList.volType+" "+this.mailList.category);
    this.adminService.sentMail(this.mailList)
      .subscribe((data: Response) => {
        this.response.message = data.message;
        this.response.httpStatus = data.httpStatus;
        this.populateData();
        alert(this.response.message);
        this.header.loader("none");
      }, error => {
          console.log("Error :"+error);
          this.header.loader("none");
    });
  }
}
