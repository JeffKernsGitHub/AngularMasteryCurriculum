import { Component, OnInit, signal, computed } from '@angular/core'; // Import signal and computed
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms-explanation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './forms-explanation.component.html',
  styleUrls: ['./forms-explanation.component.css']
})
export class FormsExplanationComponent implements OnInit {

  // --- Reactive Forms ---
  reactiveForm!: FormGroup;

  // --- Template-Driven Forms ---
  templateDrivenModel = {
    name: '',
    email: ''
  };

  // --- Signal-Based Forms ---
  signalName = signal<string>('');
  signalEmail = signal<string>('');
  signalMessage = signal<string>('');

  signalNameTouched = signal<boolean>(false);
  signalEmailTouched = signal<boolean>(false);
  signalMessageTouched = signal<boolean>(false);

  isSignalNameValid = computed(() => this.signalName().trim().length >= 3);
  isSignalEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.signalEmail()));
  isSignalMessageValid = computed(() => this.signalMessage().trim().length > 0);

  isSignalFormValid = computed(() =>
    this.isSignalNameValid() && this.isSignalEmailValid() && this.isSignalMessageValid()
  );

  ngOnInit(): void {
    // Initialize Reactive Form
    this.reactiveForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onReactiveSubmit(): void {
    if (this.reactiveForm.valid) {
      console.log('Reactive Form Submitted!', this.reactiveForm.value);
      alert('Reactive Form Submitted! Check console for data.');
      this.reactiveForm.reset();
    } else {
      console.log('Reactive Form is invalid.');
      alert('Reactive Form is invalid. Please check your inputs.');
    }
  }

  onTemplateDrivenSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Template-Driven Form Submitted!', this.templateDrivenModel);
      alert('Template-Driven Form Submitted! Check console for data.');
      form.resetForm();
    } else {
      console.log('Template-Driven Form is invalid.');
      alert('Template-Driven Form is invalid. Please check your inputs.');
    }
  }

  onSignalFormSubmit(): void {
    // Mark all fields as touched to display validation messages
    this.signalNameTouched.set(true);
    this.signalEmailTouched.set(true);
    this.signalMessageTouched.set(true);

    if (this.isSignalFormValid()) {
      console.log('Signal-Based Form Submitted!', {
        name: this.signalName(),
        email: this.signalEmail(),
        message: this.signalMessage()
      });
      alert('Signal-Based Form Submitted! Check console for data.');
      // Reset form
      this.signalName.set('');
      this.signalEmail.set('');
      this.signalMessage.set('');
      this.signalNameTouched.set(false);
      this.signalEmailTouched.set(false);
      this.signalMessageTouched.set(false);
    } else {
      console.log('Signal-Based Form is invalid.');
      alert('Signal-Based Form is invalid. Please check your inputs.');
    }
  }

  // Methods to update signals from input events
  updateSignalName(event: Event): void {
    this.signalName.set((event.target as HTMLInputElement).value);
    this.markSignalNameAsTouched();
  }

  updateSignalEmail(event: Event): void {
    this.signalEmail.set((event.target as HTMLInputElement).value);
    this.markSignalEmailAsTouched();
  }

  updateSignalMessage(event: Event): void {
    this.signalMessage.set((event.target as HTMLTextAreaElement).value);
    this.markSignalMessageAsTouched();
  }

  // Methods to mark fields as touched
  markSignalNameAsTouched(): void {
    this.signalNameTouched.set(true);
  }

  markSignalEmailAsTouched(): void {
    this.signalEmailTouched.set(true);
  }

  markSignalMessageAsTouched(): void {
    this.signalMessageTouched.set(true);
  }
}
