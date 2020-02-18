import { Component, OnInit, Renderer2,ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-feedback-quest-add',
  templateUrl: './feedback-quest-add.component.html',
  styleUrls: ['./feedback-quest-add.component.css']
})
export class FeedbackQuestAddComponent implements OnInit {

@ViewChild('div') div: ElementRef;
Qcount=0;
  constructor (private renderer: Renderer2){

  }
  
  ngOnInit() {
  }
  removeAnswer(){
    var el = document.getElementById("row"+this.Qcount);
    el.remove(); // Removes the div with the 'row' id
    this.Qcount--;
  } 

  addAnswer(){
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
