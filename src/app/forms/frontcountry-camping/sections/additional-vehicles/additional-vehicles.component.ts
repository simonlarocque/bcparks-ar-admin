import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-additional-vehicles',
  templateUrl: './additional-vehicles.component.html',
  styleUrls: ['./additional-vehicles.component.scss', '../../../../shared/components/forms/base-form/base-form.component.scss']
})
export class AdditionalVehiclesComponent implements OnInit {
  @Input() secondCarsAttendanceStandardField = new UntypedFormControl;
  @Input() secondCarsAttendanceSeniorField = new UntypedFormControl;
  @Input() secondCarsAttendanceSocialField = new UntypedFormControl;
  @Input() secondCarsRevenueGrossField = new UntypedFormControl;
  @Input() attendanceTotal: formulaResult = {result: null, formula: ''};
  @Input() revenueTotal: formulaResult = {result: null, formula: ''};

  constructor() { }

  ngOnInit(): void {
  }

}
