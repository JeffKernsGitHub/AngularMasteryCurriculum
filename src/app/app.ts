import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiServicesModule } from './di-services/di-services.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DiServicesModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AngularMasteryCurriculum');
}
