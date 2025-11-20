import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-hello-jeffy',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hello-jeffy.html',
  styleUrl: './hello-jeffy.scss',
})
export class HelloJeffy implements OnInit {

  coolname = 'Earl'; // change to mess with Jeffy
  paragraphtext = 'This is the inner text in that paragraph tag.  This can be for any html attribute.';
  showDetails = false;
  items = ['Apple Fritters', 'Oatmeal Cookies', 'Pumpkin Rolls'];
  detailsBtnText = 'Show Details'

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  changeName() {
    if (this.coolname === 'Earl') {
      this.coolname = 'Jeffy';
    } else {
      this.coolname = 'Earl';
    }
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
    if (this.showDetails) {
      this.detailsBtnText = 'Hide Details';
    }else{
      this.detailsBtnText = 'Show Details';
    }
  }
}
