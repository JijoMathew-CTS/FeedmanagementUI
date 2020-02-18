import { Component, OnInit } from '@angular/core';
import { faAngry, faFrown, faMeh, faSmile, faGrinAlt } from '@fortawesome/free-solid-svg-icons';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/Feedback';
import { Response } from 'src/app/models/Response'

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  faAngry   = faAngry;
  faFrown   = faFrown;
  faMeh     = faMeh;
  faSmile   = faSmile;
  faGrinAlt = faGrinAlt;

  isangActive: boolean = false;
  isfroActive: boolean = false;
  ismehActive: boolean = false;
  issmiActive: boolean = false;
  isgriActive: boolean = false;

  message: string = "";
  submitted: boolean = false;

  feedback: Feedback = { eventId: "", employeeId: "", score: 0, answer1: "", answer2: "", status: "" };

  ques1: string;
  ques2: string;

  statAns2:string="Mandatory";

  isHidden: boolean = true;
  response: Response = { message: "", httpStatus: 0 };

  constructor(private feedbackService: FeedbackService, private route: ActivatedRoute,private authService: AuthenticationService) { }

  ngOnInit() {

    // set feedback properties from query params
    this.feedback.eventId   = this.route.snapshot.queryParamMap.get('eventid');
    this.feedback.employeeId= this.route.snapshot.queryParamMap.get('id');

    //url parameter checking method calling...On condition failure redirect to login
    //this.feedbackService.urlchk(this.feedback.eventId,this.feedback.employeeId);
    
    //load question from service
    //var questions = this.feedbackService.getQuestions();
    this.ques1 = 'What did you like about this volunteering activity?';
    this.ques2 = 'What can be improved about this activity?';
  }

  resetSmiley() {
    //reset color and color
      this.isangActive = false;
      this.isfroActive = false;
      this.ismehActive = false;
      this.issmiActive = false;
      this.isgriActive = false;
      this.feedback.score = 0;
  }

  iconAClicked(event: Event) {
    this.resetSmiley();                             //reset color and color
    this.isangActive    = !this.isangActive;        //change color
    this.feedback.score = this.isangActive ? 1 : 0; //set score
    this.statAns2="Mandatory";
  
  }
  iconFClicked(event: Event) {
    this.resetSmiley();                             //reset color and color
    this.isfroActive    = !this.isfroActive;        //change color
    this.feedback.score = this.isfroActive ? 2 : 0; //set score
    this.statAns2="Mandatory";
  }
  iconMClicked(event: Event) {
    this.resetSmiley();                             //reset color and color
    this.ismehActive    = !this.ismehActive;        //change color
    this.feedback.score = this.ismehActive ? 3 : 0; //set score
    this.statAns2="Optional";
  }
  iconSClicked(event: Event) {
    this.resetSmiley();                             //reset color and color
    this.issmiActive    = !this.issmiActive;        //change color
    this.feedback.score = this.issmiActive ? 4 : 0; //set score
    this.statAns2="Optional";
  }
  iconGClicked(event: Event) {
    this.resetSmiley();                             //reset color and color
    this.isgriActive    = !this.isgriActive;        //change color
    this.feedback.score = this.isgriActive ? 5 : 0; //set score
    this.statAns2="Optional";
  }

  save() {
    this.feedback.status = "I";

    this.feedbackService.saveFeedback(this.feedback)
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

  onSubmit() {
    if(this.feedback.score===0){
      alert("Please select a rating");
    }
    else if(this.feedback.answer1===""){
      alert("Please enter feedback answer.");
    }
    else if(this.feedback.answer2==="" && this.feedback.score<3){
      alert("Please enter feedback answer.");
    }
    else{
      this.submitted = true;
      this.save();
    }
  }

}
