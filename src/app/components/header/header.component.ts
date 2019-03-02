import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  showError: boolean;
  userDetails: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpRequestsService) { }

  ngOnInit() {
    // fetch user details from local storage 
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    // create/setup login form
    this.loginForm = this.formBuilder.group({
      employeeId: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.httpService.logIn(this.loginForm.value.employeeId).subscribe(res => {
      localStorage.setItem('userDetails', JSON.stringify(res.user));
      this.router.navigate(['/booking/', this.loginForm.value.employeeId]);
    }, error => this.showError = true)
  }

  logOut() {
    // clear localStorage
    localStorage.removeItem('userDetails');
    this.router.navigate(['/']);
  }

}
