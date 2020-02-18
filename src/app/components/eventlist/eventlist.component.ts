import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {

  constructor(private router: Router) { }
  datalist=[];
  datalistDetail=[];
  //nameSearch="";
  ngOnInit() {
    this.datalist= [
      { id:1, name: "view",  inventory: 5,   unit_price: 45.99  },
      { id:1, name: "view",  inventory: 10,  unit_price: 123.75 },
      { id:1, name: "view",  inventory: 2,   unit_price: 399.50 }
    ];
  }
  eventDetails(){
    this.router.navigate(['/event'])
  }
filterItemsOfType(type){
    return this.datalist.filter(x => x.data.type == type);
}

}
