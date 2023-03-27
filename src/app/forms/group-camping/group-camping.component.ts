import { ChangeDetectorRef, Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { SubAreaService } from 'src/app/services/sub-area.service';
import {
  formulaResult,
  FormulaService,
} from 'src/app/services/formula.service';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';
import { Constants } from 'src/app/shared/utils/constants';
import { LoadingService } from 'src/app/services/loading.service';
import { ValidationService } from 'src/app/services/validation.service';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-group-camping',
  templateUrl: './group-camping.component.html',
  styleUrls: ['./group-camping.component.scss'],
})
export class GroupCampingComponent extends BaseFormComponent {
  public attendanceTotal: formulaResult = { result: null, formula: '' };
  public standardRevenueTotal: formulaResult = { result: null, formula: '' };
  public youthRevenueTotal: formulaResult = { result: null, formula: '' };

  constructor(
    protected formBuilder: UntypedFormBuilder,
    protected formService: FormService,
    protected dataService: DataService,
    protected router: Router,
    protected activityService: ActivityService,
    protected formulaService: FormulaService,
    protected loadingService: LoadingService,
    protected validationService: ValidationService,
    protected changeDetectior: ChangeDetectorRef
  ) {
    super(
      formBuilder,
      formService,
      router,
      dataService,
      activityService,
      formulaService,
      loadingService,
      changeDetectior
    );
    // push existing form data to parent subscriptions
    this.subscriptions.add(
      this.dataService
        .getItemValue(Constants.dataIds.ACCORDION_GROUP_CAMPING)
        .subscribe((res) => {
          if (res) {
            this.data = res;
            this.setForm();
          }
        })
    );
    this.setForm();
  }

  setForm() {
    // declare activity type
    (this.postObj['activity'] = 'Group Camping'),
      // initialize the form and populate with values if they exist.
      (this.form = new UntypedFormGroup({
        standardRateGroupsTotalPeopleStandardControl: new UntypedFormControl(
          {
            value: this.data.standardRateGroupsTotalPeopleStandard,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        standardRateGroupsTotalPeopleAdultsControl: new UntypedFormControl(
          {
            value: this.data.standardRateGroupsTotalPeopleAdults,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        standardRateGroupsTotalPeopleYouthControl: new UntypedFormControl(
          {
            value: this.data.standardRateGroupsTotalPeopleYouth,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        standardRateGroupsTotalPeopleKidsControl: new UntypedFormControl(
          {
            value: this.data.standardRateGroupsTotalPeopleKids,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        standardRateGroupsRevenueGrossControl: new UntypedFormControl(
          {
            value: this.data.standardRateGroupsRevenueGross,
            disabled: this.loading,
          },
          this.validationService.moneyFieldValidator()
        ),
        youthRateGroupsAttendanceGroupNightsControl: new UntypedFormControl(
          {
            value: this.data.youthRateGroupsAttendanceGroupNights,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        youthRateGroupsAttendancePeopleControl: new UntypedFormControl(
          {
            value: this.data.youthRateGroupsAttendancePeople,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        youthRateGroupsRevenueGrossControl: new UntypedFormControl(
          {
            value: this.data.youthRateGroupsRevenueGross,
            disabled: this.loading,
          },
          this.validationService.moneyFieldValidator()
        ),
        varianceNotesControl: new UntypedFormControl({
          value: this.data.notes,
          disabled: this.loading,
        }),
      })),
      // link form controls to the object fields they represent
      (this.fields = {
        standardRateGroupsTotalPeopleStandard: this.form.get(
          'standardRateGroupsTotalPeopleStandardControl'
        ),
        standardRateGroupsTotalPeopleAdults: this.form.get(
          'standardRateGroupsTotalPeopleAdultsControl'
        ),
        standardRateGroupsTotalPeopleYouth: this.form.get(
          'standardRateGroupsTotalPeopleYouthControl'
        ),
        standardRateGroupsTotalPeopleKids: this.form.get(
          'standardRateGroupsTotalPeopleKidsControl'
        ),
        standardRateGroupsRevenueGross: this.form.get(
          'standardRateGroupsRevenueGrossControl'
        ),
        youthRateGroupsAttendanceGroupNights: this.form.get(
          'youthRateGroupsAttendanceGroupNightsControl'
        ),
        youthRateGroupsAttendancePeople: this.form.get(
          'youthRateGroupsAttendancePeopleControl'
        ),
        youthRateGroupsRevenueGross: this.form.get(
          'youthRateGroupsRevenueGrossControl'
        ),
        notes: this.form.get('varianceNotesControl'),
      });

    this.calculateTotals();
    super.subscribeToChanges(() => {
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.attendanceTotal = this.formulaService.groupCampingStandardAttendance([
      this.fields.standardRateGroupsTotalPeopleAdults.value,
      this.fields.standardRateGroupsTotalPeopleYouth.value,
      this.fields.standardRateGroupsTotalPeopleKids.value,
    ]);
    this.standardRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.standardRateGroupsRevenueGross.value,
    ]);
    this.youthRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.youthRateGroupsRevenueGross.value,
    ]);
  }

  async onSubmit() {
    await super.submit();
  }
}
