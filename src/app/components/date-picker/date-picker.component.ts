import { Component, OnInit, Output, EventEmitter, Input, ElementRef, SimpleChanges } from '@angular/core';
import { Globals } from 'src/app/global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @Input() shifts: Array<any>;
  @Output() onSelectedDate: EventEmitter<any> = new EventEmitter<any>();

  // assuming that this the shift is per year, so you can only view current year
  year = (new Date()).getFullYear();
  months: Array<any>;
  selectedMonth = null;
  selectedDay: number;
  daysOfWeek = Globals.daysOfWeek();
  days: Array<any>;
  addEditShiftForm: FormGroup;
  pop: any;
  submitted: boolean;
  selectedDateString: string;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.months = Globals.months()
    this.selectedMonth = this.selectedMonth === null ? (new Date()).getMonth() + 1 : this.selectedMonth;
    this.addEditShiftForm = this.formBuilder.group({
      shiftPeriod: ['', Validators.required]
    });
    this.setDefaults();
  }
  // convenience getter for easy access to form fields
  get f() { return this.addEditShiftForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.submitted, this.addEditShiftForm.controls);
    // stop here if form is invalid
    if (this.addEditShiftForm.invalid) {
      return;
    }
    this.onSelectedDate.emit({ p: this.pop, dateString: this.year + '-' + this.selectedMonth + '-' + this.selectedDay, shift: this.addEditShiftForm.value.shiftPeriod })
  }

  nextYear() {
    this.selectedMonth = (this.selectedMonth === 12) ? 1 : this.selectedMonth + 1;
    this.setDefaults();
  }

  prevYear() {
    this.selectedMonth = (this.selectedMonth === 1) ? 12 : this.selectedMonth - 1;
    this.setDefaults();
  }

  setDefaults() {
    this.days = this.generateDaysInMonth();
  }

  // this method is to get the number of days in the selected month
  generateDaysInMonth(): string[] {
    const month = this.selectedMonth;
    const daysInMonthList = [];
    const tempSpace = [];
    const daysInMonth = new Date(this.year, month, 0).getDate();
    const date = new Date(this.year, month - 1, 1);
    for (let count = 1; count <= daysInMonth; count++) {
      daysInMonthList.push(count);
    }
    let spaces: number;
    if (date.getDay() === 0) {
      spaces = 6;
    } else {
      spaces = date.getDay() - 1;
    }
    for (let i = 0; i < spaces; i++) {
      tempSpace.push('');
    }
    return tempSpace.concat(daysInMonthList);
  }

  // method is to add styling (color) to days -
  // to make it more readable to the user
  getClassName(day) {
    let cname = '';
    let dateString = this.year + '-' + this.selectedMonth + '-' + day;
    if (day.toString().length > 0) {
      cname = 'li-not-empty is-clickable ';
      if (this.shifts && this.shifts.length > 0) {
        this.shifts.forEach(s => {
          const sameDate = Globals.isSameDate(new Date(dateString), new Date(s.date));
          if (sameDate && s.shift === 'am') {
            cname += 'am';
          } else if (sameDate && s.shift === 'pm') {
            cname += 'pm';
          }
        });
      }
    }
    return cname;
  }

  // if selected date is not in the past
  // method triggers a popup to select  and save
  // shift option
  selectedDate(p, day) {
    this.selectedDateString = day + '/' + this.selectedMonth + '/' + this.year;
    // close opened popover
    if (this.pop) {
      this.closePopover();
    }
    // set new pop
    let dateString = this.year + '-' + this.selectedMonth + '-' + day;
    const isPast = Globals.isBeforeDate(new Date(dateString), new Date());
    // You can not book shift for past dates
    if (!isPast) {
      this.pop = p;
      p.open();
      this.selectedDay = day;
    }
  }

  // reload days for a month is mouth changes via dropdown
  setSelectedMonth() {
    this.setDefaults();
  }

  // close pop over
  cancel() {
    this.closePopover();
  }

  closePopover() {
    this.pop.close()
    this.addEditShiftForm.reset();
  }
}