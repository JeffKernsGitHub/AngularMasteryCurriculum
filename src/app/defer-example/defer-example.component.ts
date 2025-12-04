import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeferredContentComponent } from './deferred-content/deferred-content.component';

@Component({
  selector: 'app-defer-example',
  standalone: true,
  imports: [CommonModule, DeferredContentComponent],
  templateUrl: './defer-example.component.html',
  styleUrls: ['./defer-example.component.scss']
})
export class DeferExampleComponent {

}
