import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventReport } from 'src/app/models/EventReport';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DetailRpt } from '../../models/DetailRpt';
import { HeaderComponent } from 'src/app/components/shared/header/header.component';

@Component({
  selector    : 'app-FeedbackReport',
  templateUrl : './feedback-report.component.html',
  styleUrls   : ['./feedback-report.component.css']
})
export class FeedbackReportComponent implements AfterViewInit, OnDestroy, OnInit {

  selectedValue : string = '';
  eventReport   : EventReport[];
  check         : boolean = true;
  roleLog = localStorage.getItem('role');

  type:string="";
  fStatus:string="";

  // dispTab1:string="block";
  //dispTab2:string="none";
  dispVa:string="table-cell";
  dispVn:string="none";

  detailRpt :DetailRpt[];
  //detail: DetailRpt
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // @ViewChild(DataTableDirective)
  // dtElement2: DataTableDirective;
  // dtOptions2: any = {};
  // dtTrigger2: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private feedbackService: FeedbackService,private header:HeaderComponent) {
  }

  selectType(event: any) {
    this.type=event.target.value;
  }
  selectStatus(event: any) {
    this.fStatus=event.target.value;
  }
  selectChangeHandler(event: any) {
  }
  report(){

    //this.selectedValue = event.target.value;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
    });

    var role = localStorage.getItem('role');
    var ascid = "";
    if (role == "ROLE_POC")
        ascid = localStorage.getItem('id');
        this.header.loader("block");
        
        this.feedbackService.getDetailReport(this.type,this.fStatus, ascid)
        .subscribe(
          data => {
            //this.detailRpt=data;
            //let obj: DetailRpt = JSON.parse(JSON.stringify(this.detailRpt));
            if(this.fStatus==='va' || this.fStatus===''){
              this.dispVa="table-cell";
              this.dispVn="none";
            }
            else{
              this.dispVa="none";
              this.dispVn="table-cell";
            }
            this.detailRpt = data;
           // if(this.fStatus==='va'){
              this.dtTrigger.next();
            //   this.dispTab1="block";
            //   this.dispTab2="none";
            // }
            // else{
            //   this.dtTrigger2.next();
            //   this.dispTab1="none";
            //   this.dispTab2="block";
            // }
            
          }, error => {
            console.log("Error :"+error);
            this.header.loader("none");
          });
          this.header.loader("none");
  }


  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom       : 'Bfrtip',
      buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
    }
    // this.dtOptions2 = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true,
    //   dom       : 'Bfrtip',
    //   buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
    // }
  }

  ngAfterViewInit(): void {
  //  if(this.fStatus==='va' || this.fStatus===''){
      this.dtTrigger.next();
    // }
    // else{
    //   this.dtTrigger2.next();
    // }
  }

  ngOnDestroy(): void {
    //if(this.fStatus==='va' || this.fStatus===''){
      this.dtTrigger.unsubscribe();
    // }
    // else{
    //   this.dtTrigger2.unsubscribe();
    // }
  }

}