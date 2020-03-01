import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventReport } from 'src/app/models/EventReport';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ReportService } from 'src/app/services/report.service';
import {EventReportResponse } from 'src/app/models/EventReportResponse';
@Component({
  selector    : 'app-datatableslibrary',
  templateUrl : './datatables-library.component.html',
  styleUrls   : ['./datatables-library.component.css']
})
export class DatatablesLibraryComponent implements AfterViewInit, OnDestroy, OnInit {
  eventReports: EventReportResponse[];
  selectedValue : string = '';
  //eventReport   : EventReport[];
  check         : boolean = true;
  roleLog = localStorage.getItem('role');

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private feedbackService: FeedbackService,private reportservice: ReportService) {
  }

  // selectChangeHandler(event: any) {

  //   this.selectedValue = event.target.value;
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //   });

  //   var role = localStorage.getItem('role');
  //   var ascid = "";
  //   if (role == "ROLE_POC")
  //     ascid = localStorage.getItem('id');

  //   /*this.feedbackService.getReport(this.selectedValue, ascid)
  //     .subscribe(
  //       data => {
  //         this.eventReport = data;
  //         this.dtTrigger.next();
  //       });
  //       */
  //       // this.feedbackService.getReport(this.selectedValue, ascid)
  //       // .subscribe(
  //       //   data => {
  //       //     this.eventReport = data;
  //       //     this.dtTrigger.next();
  //       //   });
  //         this.reportservice.getEventsReport(this.selectedValue, ascid)
  //         .subscribe(
  //           data=>{
  //             this.eventReports=data;
  //             this.dtTrigger.next();
  //           }
  //         );
  // }


  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom       : 'Bfrtip',
      // buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
      buttons: [ {extend: 'excel',text:'Download Excel'}, ],
    }
    var role = localStorage.getItem('role');
    var ascid = "";
    if (role == "ROLE_POC")
      ascid = localStorage.getItem('id');
    this.reportservice.getEventsReport(this.selectedValue, ascid)
    .subscribe(
      data=>{
        this.eventReports=data;
        this.dtTrigger.next(); 
        //this.dtTrigger.next();
        // console.log(""+this.eventReports);
      }
    );
  }

  ngAfterViewInit(): void {
   // this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}