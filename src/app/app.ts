import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeferExampleComponent } from './defer-example/defer-example.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DeferExampleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AngularMasteryCurriculum');
}
