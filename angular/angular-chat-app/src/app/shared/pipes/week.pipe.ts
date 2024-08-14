import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'week',
  standalone: true
 })
export class WeekPipe implements PipeTransform {
  transform(value: Date): number {
    return this.getWeekNumber(value);
  }

private getWeekNumber(d: Date): number {
    d = new Date(+d);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    var yearStart = new Date(d.getFullYear(), 0, 1);
    var weekNo = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
    return weekNo;
  }
}

