import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from 'src/app/services/http-requests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements OnInit {

  profiles: any[];
  loading = false;
  empId: number;
  userDetails: any;
  shifts: any;

  constructor(private httpService: HttpRequestsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.route.params.subscribe(val => {
      this.empId = +val.id;
      this.fetchShiftDetails();
    });
  }

  // assumption: you have 2 shifts same day
  // each shift is 12hrs

  fetchShiftDetails() {
    this.loading = true;
    this.httpService.getShiftDetails(this.empId).subscribe(res => {
      this.shifts = res.shifts;
      this.loading = false;
    })
  }

  getSelectedDate(obj) {
    const params = {
      "firstname": this.userDetails.firstname,
      "lastname": this.userDetails.lastname,
      "date": obj.dateString,
      "shift": obj.shift,
      "employeeId": this.empId
    }
    this.httpService.addShifts(this.empId, params).subscribe(res => {
      this.shifts.push(params);
      obj.p.close();
    })
  }

}
