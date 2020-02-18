import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { DashResponse } from '../models/DashResponse';
import { PocService } from '../services/poc.service';
import { DashRpt } from '../models/DashRpt';
import { EventReport } from 'src/app/models/EventReport';
import { faAngry, faFrown, faMeh, faSmile, faGrinAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  faAngry   = faAngry;
  faFrown   = faFrown;
  faMeh     = faMeh;
  faSmile   = faSmile;
  faGrinAlt = faGrinAlt;

  noOfEvents: string;
  noOfVolunteers: string;
  positiveFeedback: number;
  negativeFeedback: number;
  isHidden: boolean = true;

  excellentPer:number;
  goodPer     :number;
  averagePer  :number;
  fairPer     :number;
  poorPer     :number;

  eventReport   : EventReport[];
  dashRpt :DashRpt[];
  cLabel=[];
  vaData=[];
  vnData=[];
  vuData=[];
  
  constructor(private feedbackService: FeedbackService, private pocService: PocService) {
    if (this.pocService.isPoc()) {
      this.isHidden = false;
    }

    this.noOfEvents       = "0";
    this.noOfVolunteers   = "0";
    this.positiveFeedback = 0;
    this.negativeFeedback = 0;

    this.excellentPer = 0;
    this.goodPer      = 0;
    this.averagePer   = 0;
    this.fairPer      = 0;
    this.poorPer      = 0;

    var role = localStorage.getItem('role');
    var ascid = "";
    if (role == "ROLE_POC")
        ascid = localStorage.getItem('id');
        
    this.feedbackService.getDashMetric()
      .subscribe((data: DashResponse) => {
        this.noOfEvents = data.noOfEvents;
        this.noOfVolunteers = data.noOfVolunteers;
        //this.positiveFeedback = Math.imul(Number.parseInt(data.positiveFeedback), 10).toString();
        //this.negativeFeedback = Math.imul(Number.parseInt(data.negativeFeedback), 10).toString();
        
        this.positiveFeedback = (data.positiveFeedback * 10);
        this.negativeFeedback = (data.negativeFeedback * 10);
        
        this.excellentPer = (data.excellentPer * 100);
        this.goodPer      = (data.goodPer      * 100);
        this.averagePer   = (data.averagePer   * 100);
        this.fairPer      = (data.fairPer      * 100);
        this.poorPer      = (data.poorPer      * 100);

      }
      );
      this.feedbackService.getDashChart(ascid)
        .subscribe(data => {
          this.dashRpt=data;
          let obj: DashRpt = JSON.parse(JSON.stringify(this.dashRpt));
          
          for(let i=0;i<Object.keys(obj).length;i++){
            this.cLabel[i]=obj[i].event;
            this.vaData[i]=obj[i].va;
            this.vnData[i]=obj[i].vn;
            this.vuData[i]=obj[i].vu;
          }
        });
        this.feedbackService.getAvgScore(ascid)
        .subscribe(data => {
          this.eventReport=data;
        });
  }


    title = 'Event Vs Volunteer Chart';
      // ADD CHART OPTIONS. 
   /* chartOptions = {
      responsive: true,    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
      options : {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              scaleBeginAtZero : true,
              min:0,
              
            }
          }]
        }
      }
    }*/
    public chartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
              beginAtZero: true,
              min:0,
            }
        }],
        xAxes:[{
          barPercentage: 0.1
        }]
      }
    }
    labels = this.cLabel; //['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    // STATIC DATA FOR THE CHART IN JSON FORMAT.
    chartData = [ { label: 'Vol: Attented'    , data: this.vaData},
                  { label: 'Vol: Not Attented', data: this.vnData},
                  { label: 'Vol: Unregisterd' , data: this.vuData},
                //{ label: ''                 , data: this.z}
                ];
    // CHART COLOR.
    colors = [  { backgroundColor: 'rgba(77,83,96,0.2)' },     // 1st .
                { backgroundColor: 'rgba(30, 169, 224, 0.8)' },// 2nd .
                { backgroundColor: '#dabb24'},                 // 3rd .
              //{ backgroundColor: '#ffffff'}                  // 4th .
             ]
    
    // CHART CLICK EVENT.
    onChartClick(event) {
      console.log(event);
    }

  ngOnInit() {
  }
}
