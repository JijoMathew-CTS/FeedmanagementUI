import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { AdminService } from 'src/app/services/admin.service';
import { FeedbackStatus } from 'src/app/models/FeedbackStatus';

@Component({
  selector: 'app-feedback-status',
  templateUrl: './feedback-status.component.html',
  styleUrls: ['./feedback-status.component.css']
})
export class FeedbackStatusComponent implements AfterViewInit, OnDestroy, OnInit {

  selectedValue: string = '';
  selected:string='none';
  //change model
  feedbackReport: FeedbackStatus[];
  check: boolean = true;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private adminService: AdminService) {
  }

  selectChangeHandler(event: any) {
    this.selected='block';
    this.selectedValue = event.target.value;

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
      responsive:true,
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'Bfrtip',
      buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print' ]
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
