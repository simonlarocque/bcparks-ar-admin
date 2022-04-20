import { Injectable } from '@angular/core';
import { Constants } from '../shared/utils/constants';
import { ApiService } from './api.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  setFormParams(params) {
    this.dataService.setItemValue(Constants.dataIds.FORM_PARAMS, params);
  }

  async postActivity(obj) {
    let res;
    try {
      // We require queryParam type = activity
      // In obj we need orcs, subAreaName, activity and date
      if (obj.orcs && obj.subAreaName && obj.activity && obj.date) {
        delete obj.pk;
        delete obj.sk;
        res = await this.apiService.post('subarea', obj, { type: 'activity' });
      }
    } catch (e) {
      // TODO: Deal with error here
    }
  }
}