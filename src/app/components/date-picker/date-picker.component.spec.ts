import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerComponent } from './date-picker.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpRequestsService } from 'src/app/services/http-requests.service';
import { NgbPopover, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let popOverService: NgbPopover;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, HttpClientModule, NgbPopoverModule, ReactiveFormsModule],
      providers: [
        NgbPopover,
        { provide: HttpRequestsService, useClass: MockHttpService }
      ]
    })
      .compileComponents()
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockHttpService {
}