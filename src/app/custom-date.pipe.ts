import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date): string {
    if (!value) {
      return '';
    }

    const day = ('0' + value.getDate()).slice(-2);
    const month = this.getMonthAbbreviation(value.getMonth());
    const year = value.getFullYear();

    return `${day}-${month}-${year}`;
  }

  private getMonthAbbreviation(month: number): string {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months[month];
  }
}
