import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomDatePipe } from '../custom-date.pipe';

/**
 * =========================================================================================
 * PipesDemoComponent - Transforming Template Data with Built-in & Custom Pipes (Phase 2)
 * =========================================================================================
 *
 * Demonstrates how Angular Pipes format and transform data directly in template expressions:
 *
 * 1. Date Transformation:
 *    - `DatePipe`: Formats raw Date objects according to locale formats (`'short'`, `'mediumDate'`, etc.).
 *    - `CustomDatePipe`: Custom pure pipe implementing `DD-MMM-YYYY` format.
 *
 * 2. Number & Financial Formatting:
 *    - `DecimalPipe` (`number`): Formats decimal points and thousands separators (`'1.2-2'`).
 *    - `CurrencyPipe` (`currency`): Formats currencies (`'USD'`, `'EUR'`, `'symbol'`).
 *    - `PercentPipe` (`percent`): Formats fractional numbers as percentages (`'1.1-2'`).
 *
 * 3. String Manipulation:
 *    - `UpperCasePipe` (`uppercase`), `LowerCasePipe` (`lowercase`), `TitleCasePipe` (`titlecase`).
 *
 * 4. Debugging & Serialization:
 *    - `JsonPipe` (`json`): Serializes complex objects to formatted JSON strings for template debugging.
 *
 * 5. Reactivity with Signals & OnPush:
 *    - Dynamic signal updates trigger pure pipe re-evaluations automatically in Zoneless mode.
 */
@Component({
  selector: 'app-pipes-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomDatePipe],
  templateUrl: './pipes-demo.component.html',
  styleUrl: './pipes-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipesDemoComponent {
  /**
   * 📅 Reactive Date Signal
   */
  readonly currentDate = signal<Date>(new Date());

  /**
   * 🔢 Reactive Number Signal
   */
  readonly someNumber = signal<number>(12345.6789);

  /**
   * 🔤 Reactive String Signal
   */
  readonly someString = signal<string>('Hello Angular 22 Pipes');

  /**
   * 📈 Reactive Percentage Signal
   */
  readonly somePercentage = signal<number>(0.8745);

  /**
   * 📦 Reactive Complex Object Signal
   */
  readonly someObject = signal({
    name: 'John Doe',
    role: 'Full Stack Engineer',
    age: 30,
    skills: ['Signals', 'Pipes', 'Zoneless', 'Control Flow'],
    active: true,
    address: { street: '123 Main St', city: 'Anytown', state: 'CA' }
  });

  /**
   * 🔄 Updates currentDate to the current timestamp.
   */
  refreshDate(): void {
    this.currentDate.set(new Date());
  }

  /**
   * ➕ Adds/subtracts days to the currentDate signal.
   */
  addDays(days: number): void {
    const current = this.currentDate();
    const newDate = new Date(current);
    newDate.setDate(newDate.getDate() + days);
    this.currentDate.set(newDate);
  }

  /**
   * ✖️ Multiplies the numeric value by a factor.
   */
  multiplyNumber(factor: number): void {
    this.someNumber.update(val => +(val * factor).toFixed(4));
  }

  /**
   * 🔄 Resets the sample number back to the initial value.
   */
  resetNumber(): void {
    this.someNumber.set(12345.6789);
  }
}
