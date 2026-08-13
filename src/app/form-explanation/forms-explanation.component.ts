import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  NonNullableFormBuilder,
  NgForm
} from '@angular/forms';

/**
 * =========================================================================================
 * FormsExplanationComponent - Comparing Form Architectures in Angular 22 (Phase 3)
 * =========================================================================================
 *
 * This component provides an in-depth side-by-side comparative analysis of the three primary
 * approaches to data input in modern Angular:
 *
 * 1. 🛡️ Reactive Forms (Model-Driven):
 *    - Built using `NonNullableFormBuilder`, `FormGroup`, and `FormControl`.
 *    - Structured explicitly in TypeScript code with full type-safety.
 *    - Best for complex validation, dynamic fields, and enterprise applications.
 *
 * 2. 📝 Template-Driven Forms (Directive-Driven):
 *    - Defined primarily in the HTML template using `ngModel` and `ngForm`.
 *    - Implicit form model inferred from DOM bindings.
 *    - Best for simple inputs, login screens, or quick prototypes.
 *
 * 3. ⚡ Signal-Based Forms (Fine-Grained Reactivity):
 *    - Uses individual `signal()` state containers and memoized `computed()` validators.
 *    - Updates trigger localized fine-grained change detection in Zoneless mode.
 *    - Aligns directly with modern Angular's reactivity paradigm.
 */
@Component({
  selector: 'app-forms-explanation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forms-explanation.component.html',
  styleUrl: './forms-explanation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsExplanationComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  /**
   * 📢 Submission feedback banner signal.
   */
  readonly submissionFeedback = signal<{ formType: string; data: any } | null>(null);

  // =========================================================================================
  // 1. 🛡️ REACTIVE FORMS SETUP
  // =========================================================================================
  readonly reactiveForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onReactiveSubmit(): void {
    if (this.reactiveForm.valid) {
      this.submissionFeedback.set({
        formType: 'Reactive Form',
        data: this.reactiveForm.getRawValue()
      });
      this.reactiveForm.reset();
    } else {
      this.reactiveForm.markAllAsTouched();
    }
  }

  // =========================================================================================
  // 2. 📝 TEMPLATE-DRIVEN FORMS SETUP
  // =========================================================================================
  templateDrivenModel = {
    name: '',
    email: ''
  };

  onTemplateDrivenSubmit(form: NgForm): void {
    if (form.valid) {
      this.submissionFeedback.set({
        formType: 'Template-Driven Form',
        data: { ...this.templateDrivenModel }
      });
      form.resetForm();
    }
  }

  // =========================================================================================
  // 3. ⚡ SIGNAL-BASED FORMS SETUP
  // =========================================================================================
  readonly signalName = signal<string>('');
  readonly signalEmail = signal<string>('');
  readonly signalMessage = signal<string>('');

  readonly signalNameTouched = signal<boolean>(false);
  readonly signalEmailTouched = signal<boolean>(false);
  readonly signalMessageTouched = signal<boolean>(false);

  /**
   * 📊 Computed Validation Signals: Pure, memoized validation checks.
   */
  readonly isSignalNameValid = computed(() => this.signalName().trim().length >= 3);
  readonly isSignalEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.signalEmail().trim()));
  readonly isSignalMessageValid = computed(() => this.signalMessage().trim().length >= 5);

  readonly isSignalFormValid = computed(() =>
    this.isSignalNameValid() && this.isSignalEmailValid() && this.isSignalMessageValid()
  );

  onSignalFormSubmit(): void {
    this.signalNameTouched.set(true);
    this.signalEmailTouched.set(true);
    this.signalMessageTouched.set(true);

    if (this.isSignalFormValid()) {
      this.submissionFeedback.set({
        formType: 'Signal-Based Form',
        data: {
          name: this.signalName(),
          email: this.signalEmail(),
          message: this.signalMessage()
        }
      });

      // Reset Signal Form
      this.signalName.set('');
      this.signalEmail.set('');
      this.signalMessage.set('');
      this.signalNameTouched.set(false);
      this.signalEmailTouched.set(false);
      this.signalMessageTouched.set(false);
    }
  }
}
