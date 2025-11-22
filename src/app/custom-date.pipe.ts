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
    const month = this.getMonthName(value.getMonth()).toUpperCase();
    const year = value.getFullYear();

    return `${day}-${month}-${year}`;
  }

  private getMonthName(month: number): string {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[month];
  }
}
