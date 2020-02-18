import { Component, OnInit, Renderer2,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback-quest-edit',
  templateUrl: './feedback-quest-edit.component.html',
  styleUrls: ['./feedback-quest-edit.component.css']
})
export class FeedbackQuestEditComponent implements OnInit {

@ViewChild('div') div: ElementRef;
Qcount=0;

  constructor(private route: ActivatedRoute,private renderer: Renderer2) { }
  id;
  answers;
  
  ngOnInit() {
   this.id = this.route.snapshot.paramMap.get("id");
    
    this.answers= [
      { id:1, name: "view",  inventory: 5,   unit_price: 45.99  },
      { id:1, name: "view",  inventory: 10,  unit_price: 123.75 },
      { id:1, name: "view",  inventory: 2,   unit_price: 399.50 }
    ];   
    this.Qcount=Object.keys(this.answers).length;
  }

  deleteAnswer(i){
    var el = document.getElementById("row"+i);
    el.remove(); // Removes the div with the 'row' id
    this.Qcount--;
  }
  removeAnswer(){
    var savedQcount=Object.keys(this.answers).length;
      if(this.Qcount<=savedQcount){
        return false;
      }
    var el = document.getElementById("row"+this.Qcount);
    el.remove(); // Removes the div with the 'row' id
    this.Qcount--;
  } 

  addAnswer(){
    //var Qcount = this.answers.
    this.Qcount++;
    const p: HTMLParagraphElement = this.renderer.createElement('p');
    var html='<div class="row" id="row'+this.Qcount+'">'
            +'  <div class="col-md-1"></div>'
            +'  <div class="col-md-2">'
            +'    Answer '+this.Qcount
            +'  </div>'
            +'  <div class="col-md-6">'
            +'    <input type="text" style="border:solid thin lightgrey ;width: 100%;" placeholder="Enter Answer'+this.Qcount+'">'
            +'  </div>'
            +'</div>';

    p.innerHTML = html;
    this.renderer.appendChild(this.div.nativeElement, p)
  }
}
