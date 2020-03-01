import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventDetailResponse } from 'src/app/models/EventDetailResponse';
import { Observable } from 'rxjs';
import { EventDetailService } from 'src/app/services/event-detail.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {

 // eventLists:Observable<EventDetailResponse[]>;
 eventLists:EventDetailResponse[];

  constructor(private router: Router,private eventDetailService:EventDetailService) { }
  datalist=[]
  //eventList:DetailRpt;
  datalistDetail=[];
  //nameSearch="";
  ngOnInit() {
  this.reloadData();
    
  }
  reloadData(){
    // this.eventLists=this.eventDetailService.getEventList();

    this.eventDetailService.getEventList(localStorage.getItem('role'),localStorage.getItem('id'))
        .subscribe(
          data => {
            this.eventLists=data;
        });
  }
 /* eventDetails(eid){
    
    let shand = document.getElementsByClassName('viewCls_'+eid) as HTMLCollectionOf<HTMLElement>;
   // this.router.navigate(['/event'])
   if (shand.length != 0) {
    if(shand[0].style.display === "table-row")
    {
      shand[0].style.display = "none";
      shand[0].style.width = "100%";
    }
    else{
      shand[0].style.display = "table-row";
      shand[0].style.width = "100%";
    }
  }
  }*/


filterItemsOfType(type){
    return this.datalist.filter(x => x.data.type == type);
}

}
