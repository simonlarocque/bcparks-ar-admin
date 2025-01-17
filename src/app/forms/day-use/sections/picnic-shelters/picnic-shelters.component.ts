import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-picnic-shelters',
  templateUrl: './picnic-shelters.component.html',
  styleUrls: ['./picnic-shelters.component.scss', '../../../../shared/components/forms/base-form/base-form.component.scss']
})
export class PicnicSheltersComponent implements OnInit {
  @Input() picnicShelterPeopleControl = new UntypedFormControl;
  @Input() picnicRevenueShelterControl = new UntypedFormControl;
  @Input() picnicRevenueGrossControl = new UntypedFormControl;
  @Input() revenueTotal: formulaResult = {result: null, formula: ''};

  constructor() { }

  ngOnInit(): void {
  }

}
