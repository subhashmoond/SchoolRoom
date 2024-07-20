import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) return '';

    // Split the input date string by commas
    const dateParts = value.split(',');
    if (dateParts.length !== 3) return value;

    const day = dateParts[0].trim();
    const month = dateParts[1].trim();
    const year = dateParts[2].trim();

    // Define month mappings
    const monthMapping : any = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    };

    const monthName = monthMapping[month];
    if (!monthName) return value;

    return `${day} ${monthName} ${year}`;
  }

}
