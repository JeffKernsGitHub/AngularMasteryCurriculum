import { Component } from '@angular/core';
import { OnPushExampleComponent } from '../on-push-example/on-push-example.component';

/**
 * The root component of the application.
 * This component is responsible for demonstrating the OnPush change detection strategy.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [OnPushExampleComponent]
})
export class AppComponent {
  /**
   * The user object that is passed to the OnPushExampleComponent.
   */
  user = { name: 'John Doe' };

  /**
   * Updates the user object with a new object reference.
   * This is done to trigger the OnPush change detection strategy in the OnPushExampleComponent.
   */
  updateUser() {
    // To trigger OnPush change detection, we need to change the object reference.
    this.user = { name: 'Jane Doe' };
  }
}
