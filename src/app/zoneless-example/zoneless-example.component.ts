import { Component, signal, computed, effect, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-zoneless-example',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './zoneless-example.component.html',
  styleUrls: ['./zoneless-example.component.css']
})
export class ZonelessExampleComponent implements OnInit {
  // ## Dependency Graph Explained
  //
  // This example demonstrates a simple dependency graph:
  //
  // `user` (signal) -\
  //                  -> `fullName` (computed) -> `updateMessage` (effect)
  //
  // - `user` is the source signal, holding the user's first and last name.
  // - `fullName` is a computed signal that derives the full name from the `user` signal.
  // - `updateMessage` is an effect that logs a message when the `fullName` changes.

  user = signal({ firstName: '', lastName: '' });

  // **Computed:** This derived signal is recalculated only when the `user` signal changes.
  fullName = computed(() => {
    console.log('Computing fullName...');
    return `${this.user().firstName} ${this.user().lastName}`;
  });

  // **Effect:** This runs a side effect (logging) whenever the `fullName` signal changes.
  updateMessage = effect(() => {
    if (this.fullName()) {
      console.log(`Full name changed to: ${this.fullName()}`);
    }
  });

  userForm: FormGroup;
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  constructor() {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: ['']
    });
  }

  ngOnInit() {
    // Fetch initial user data from the mock API
    this.apiService.getUser().subscribe(initialUser => {
      this.user.set(initialUser);
      this.userForm.patchValue(initialUser);
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.userForm.valid) {
      // Save the user data using the mock API
      this.apiService.saveUser(this.userForm.value).subscribe(savedUser => {
        // Update the signal with the saved data, which triggers the dependency graph
        this.user.set(savedUser);
      });
    }
  }
}
