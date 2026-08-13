import { Pipe, PipeTransform } from '@angular/core';

/**
 * =========================================================================================
 * CustomDatePipe - Custom Pure Pipe Demonstration (Phase 2: Pipes)
 * =========================================================================================
 *
 * What is a Pipe?
 * A pipe is a function declared with the `@Pipe` decorator that transforms input values
 * in template expressions (`{{ value | customDate }}`) without modifying the underlying data.
 *
 * Key Concepts:
 * 1. Pure Pipes (`pure: true` by default):
 *    - Angular only invokes `transform()` when it detects a change to the input value's primitive
 *      value or object reference (memoized/pure function).
 *    - Because the pipe is pure, Angular avoids re-running the formatting logic on every change
 *      detection cycle, drastically improving rendering performance.
 *
 * 2. Standalone Pipe (`standalone: true`):
 *    - Can be directly imported into any standalone component's `imports` array without NgModules.
 *
 * 3. The `PipeTransform` Interface:
 *    - Requires implementing the `transform(value, ...args)` method.
 */
@Pipe({
  name: 'customDate',
  standalone: true,
  pure: true // Default behavior: recomputed only when the input value or argument changes
})
export class CustomDatePipe implements PipeTransform {
  /** Month abbreviations lookup table */
  private static readonly MONTHS = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  /**
   * Transforms a Date, timestamp, or date string into a standardized formatted string.
   *
   * @param value The raw date object, timestamp, or ISO string.
   * @param format Optional format selector ('DD-MMM-YYYY' or 'YYYY-MM-DD' or 'MMM DD, YYYY').
   * @returns Formatted date string, or empty string if input is null/invalid.
   */
  transform(
    value: Date | string | number | null | undefined,
    format: 'DD-MMM-YYYY' | 'YYYY-MM-DD' | 'MMM DD, YYYY' = 'DD-MMM-YYYY'
  ): string {
    if (!value) {
      return '';
    }

    // Coerce strings or timestamps to Date object
    const date = value instanceof Date ? value : new Date(value);

    // Validate date
    if (isNaN(date.getTime())) {
      return '';
    }

    const day = ('0' + date.getDate()).slice(-2);
    const monthIndex = date.getMonth();
    const monthAbbr = CustomDatePipe.MONTHS[monthIndex];
    const monthNum = ('0' + (monthIndex + 1)).slice(-2);
    const year = date.getFullYear();

    switch (format) {
      case 'YYYY-MM-DD':
        return `${year}-${monthNum}-${day}`;
      case 'MMM DD, YYYY':
        return `${monthAbbr} ${day}, ${year}`;
      case 'DD-MMM-YYYY':
      default:
        return `${day}-${monthAbbr}-${year}`;
    }
  }
}
