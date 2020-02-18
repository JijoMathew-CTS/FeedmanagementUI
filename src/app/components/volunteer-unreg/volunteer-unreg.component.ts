import { Component, OnInit } from '@angular/core';
import { FeedbackOption } from '../../models/FeedbackOption';
import { Response } from '../../models/Response';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-volunteer-unreg',
  templateUrl: './volunteer-unreg.component.html',
  styleUrls: ['./volunteer-unreg.component.css']
})
export class VolunteerUnregComponent implements OnInit {

  message: string = "";
  submitted: boolean = false;

  feedback: FeedbackOption = { eventId: "", employeeId: "", choice: "", status: "" };

  options=[];

  isHidden: boolean = true;
  response: Response = { message: "", httpStatus: 0 };

  constructor(private feedbackService: FeedbackService, private route: ActivatedRoute) { }

  ngOnInit() {
    // set feedback properties from query params
    this.feedback.eventId   = this.route.snapshot.queryParamMap.get('eventid');
    this.feedback.employeeId= this.route.snapshot.queryParamMap.get('id');

    //url parameter checking method calling...On condition failure redirect to login
    //this.feedbackService.urlchk(this.feedback.eventId,this.feedback.employeeId);

    //load options from service
    //var options = this.feedbackService.getOptions();

     this.options= [
        { id:1, option: "Did not recieve information about event" },
        { id:2, option: "Event not what I excepted" },
        { id:3, option: "Incorrectly registered" },
        { id:4, option: "Unexpected personal commitment" },
        { id:5, option: "Unexpected official work" },
        { id:6, option: "Do not wish to disclose" },
    ];
  }

  selectChangeHandler(event: any) {
    this.feedback.choice = event.target.value;
  }

  save() {
    if(this.feedback.choice===""){
      alert("Select a reason");
    }
    else{
      this.feedback.status = "I";
      this.feedbackService.saveUnRegFeedback(this.feedback)
        .subscribe((data: Response) => {
          this.response.message = data.message;
          this.response.httpStatus = data.httpStatus;
          if (this.response.httpStatus == 200) {
            this.message = this.response.message;
            this.submitted = !this.submitted;
            this.isHidden = !this.isHidden;
          }
        }
        );
    }
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
