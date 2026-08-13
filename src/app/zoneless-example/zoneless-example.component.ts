import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
  inject
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService, UserData } from './api.service';

/**
 * =========================================================================================
 * ZonelessExampleComponent - Fine-Grained Signal Change Detection (Phase 4)
 * =========================================================================================
 *
 * Demonstrates the Signal Strategy in a native Zoneless Angular 22 environment:
 *
 * 1. 📊 Fine-Grained Reactive Dependency Graph:
 *
 *    ┌──────────────┐
 *    │  user Signal │ ───────► ┌─────────────────────────┐ ──────► ┌────────────────────────┐
 *    └──────────────┘          │ fullName computed()     │         │ updateEffect effect()  │
 *                              │ (Pure memoized derived) │         │ (Async side effects)   │
 *                              └─────────────────────────┘         └────────────────────────┘
 *                                          │
 *                                          ▼
 *                              ┌─────────────────────────┐
 *                              │ initials / totalChars   │
 *                              └─────────────────────────┘
 *
 * 2. ⚡ Eliminating Zone.js:
 *    - Zone.js assumes changes *might* have happened after every async event, traversing the entire tree.
 *    - Signals know changes *did* happen upon `.set()` / `.update()`, targeting only dependent DOM nodes.
 *
 * 3. 🧠 Memoization with `computed()`:
 *    - Cached calculations that only recompute when their underlying signal dependencies change.
 *
 * 4. 🔄 Side Effects with `effect()`:
 *    - Automatically registers dependencies and triggers background synchronizations / audit logs.
 */
@Component({
  selector: 'app-zoneless-example',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './zoneless-example.component.html',
  styleUrl: './zoneless-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZonelessExampleComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly fb = inject(NonNullableFormBuilder);

  // =========================================================================================
  // 1. SOURCE SIGNALS (State Holders)
  // =========================================================================================
  readonly user = signal<UserData>({
    firstName: '',
    lastName: '',
    department: ''
  });

  readonly isLoading = signal<boolean>(true);
  readonly isSaving = signal<boolean>(false);
  readonly auditLogs = signal<string[]>([]);

  // =========================================================================================
  // 2. COMPUTED SIGNALS (Pure Memoized Derived State)
  // =========================================================================================
  /**
   * Derives the full name string automatically from the `user` signal.
   */
  readonly fullName = computed(() => {
    const { firstName, lastName } = this.user();
    const combined = `${firstName} ${lastName}`.trim();
    return combined || 'Anonymous User';
  });

  /**
   * Derives uppercase initials from first & last name.
   */
  readonly initials = computed(() => {
    const { firstName, lastName } = this.user();
    const firstChar = firstName ? firstName.charAt(0) : '';
    const lastChar = lastName ? lastName.charAt(0) : '';
    return `${firstChar}${lastChar}`.toUpperCase() || '--';
  });

  /**
   * Computes character length of full name.
   */
  readonly totalChars = computed(() => this.fullName().length);

  // =========================================================================================
  // 3. REACTIVE FORM (Typed Form Model)
  // =========================================================================================
  readonly userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    department: ['', Validators.required]
  });

  constructor() {
    // =======================================================================================
    // 4. EFFECT (Side-Effect Synchronization)
    // =======================================================================================
    effect(() => {
      const name = this.fullName();
      const timestamp = new Date().toLocaleTimeString();
      const logEntry = `[${timestamp}] ⚡ Signal Dependency Graph updated fullName: "${name}"`;

      // Update audit logs signal
      this.auditLogs.update(logs => [logEntry, ...logs.slice(0, 7)]);
    });
  }

  ngOnInit(): void {
    // Fetch initial user data from mock API
    this.apiService.getUser().subscribe(initialUser => {
      this.user.set(initialUser);
      this.userForm.setValue(initialUser);
      this.isLoading.set(false);
    });
  }

  /**
   * Persists form changes and updates the root signal.
   */
  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSaving.set(true);
      const updatedData = this.userForm.getRawValue();

      this.apiService.saveUser(updatedData).subscribe(savedUser => {
        // Explicitly update source signal -> triggers computed signals & effects
        this.user.set(savedUser);
        this.isSaving.set(false);
      });
    }
  }

  /**
   * Quick preset button to test immediate Signal update.
   */
  applyQuickPreset(first: string, last: string, dept: string): void {
    const preset: UserData = { firstName: first, lastName: last, department: dept };
    this.userForm.setValue(preset);
    this.user.set(preset);
  }
}
