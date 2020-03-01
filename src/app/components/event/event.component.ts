import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetailService } from 'src/app/services/event-detail.service';
import { EventBeneficiaryResponse } from 'src/app/models/EventBeneficiaryResponse';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [DatePipe]
})
export class EventComponent implements OnInit {
  eventLists:EventBeneficiaryResponse[];

  constructor(private route: ActivatedRoute,private eventDetailService:EventDetailService,private datePipe: DatePipe) { }
  eid;

  ngOnInit() {
    this.eid = this.route.snapshot.paramMap.get("eid");



    this.eventDetailService.getEventBeneficiary(this.eid).subscribe(data => {
            this.eventLists=data ? data['0'] : {};
            console.log(" eventLists ",this.eventLists)
        });
        
  }




}
