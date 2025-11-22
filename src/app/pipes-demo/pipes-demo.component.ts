import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from '../custom-date.pipe';

@Component({
  selector: 'app-pipes-demo',
  standalone: true,
  imports: [CommonModule, CustomDatePipe],
  templateUrl: './pipes-demo.component.html',
  styleUrls: ['./pipes-demo.component.scss']
})
export class PipesDemoComponent {
  currentDate = new Date();
  someNumber = 12345.6789;
  someString = 'Hello World';
  someObject = { name: 'John', age: 30, address: { street: '123 Main St', city: 'Anytown' } };
}
