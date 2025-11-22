import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsExplanationComponent } from './form-explanation/forms-explanation.component'; // Import your new component

@Component({
  selector: 'app-root',
  standalone: true, // Ensure this is marked as standalone if it's not already
  imports: [RouterOutlet, FormsExplanationComponent], // Add FormsExplanationComponent to the imports array
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AngularMasteryCurriculum');
}
