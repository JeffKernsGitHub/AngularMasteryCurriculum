import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HelloJeffy} from './hello-jeffy/hello-jeffy';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HelloJeffy],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AngularMasteryCurriculum');
}
