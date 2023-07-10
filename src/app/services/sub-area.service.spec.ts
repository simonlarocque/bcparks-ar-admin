import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { DataService } from './data.service';
import { EventService } from './event.service';
import { LoadingService } from './loading.service';
import { Constants } from '../shared/utils/constants';
import { SubAreaService } from './sub-area.service';
import { ToastService } from './toast.service';
import { LoggerService } from './logger.service';
import { ApiService } from './api.service';
import { ActivityService } from './activity.service';
import { BehaviorSubject } from 'rxjs';

describe('SubAreaService', () => {
  let dataServiceSpy;
  let subareaService: SubAreaService;

  let loadingServiceAddSpy;
  let loadingServiceRemoveSpy;
  let loadingService: LoadingService;

  let loggerService: LoggerService;
  let loggerServiceDebugSpy;
  let loggerServiceErrorSpy;

  let apiService: ApiService;
  let apiServiceSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        DataService,
        EventService,
        ToastService,
        HttpHandler,
        ConfigService,
        LoadingService,
        ActivityService,
      ],
    });
    subareaService = TestBed.inject(SubAreaService);
    loadingService = TestBed.inject(LoadingService);
    loggerService = TestBed.inject(LoggerService);
    apiService = TestBed.inject(ApiService);
    dataServiceSpy;
    loadingServiceAddSpy = spyOn(
      subareaService['loadingService'],
      'addToFetchList'
    );
    loadingServiceRemoveSpy = spyOn(
      subareaService['loadingService'],
      'removeToFetchList'
    );
    loggerServiceDebugSpy = spyOn(subareaService['loggerService'], 'debug');
    loggerServiceErrorSpy = spyOn(subareaService['loggerService'], 'error');
  });

  it('should be created', () => {
    expect(subareaService).toBeTruthy();
  });

  it('fetches subarea details', async () => {
    apiServiceSpy = spyOn(subareaService['apiService'], 'get');
    await subareaService.fetchSubArea(2, 22, 222, null);

    expect(loadingServiceAddSpy).toHaveBeenCalledWith(2);
    expect(loadingServiceRemoveSpy).toHaveBeenCalledWith(2);
    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
    expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);

    expect(apiServiceSpy).toHaveBeenCalledWith('park', {
      orcs: 22,
      subAreaId: 222,
    });
  });

  it('fetches subarea activity', async () => {
    apiServiceSpy = spyOn(subareaService['apiService'], 'get').and.returnValue(new BehaviorSubject({data:['valid_Data']}));
    const fetchActivityDetailsSpy = spyOn(subareaService['activityService'], 'fetchActivityDetails');
    await subareaService.fetchSubArea(2, 22, 222, 2222);
    // Call once for every activity when searching
    expect(fetchActivityDetailsSpy).toHaveBeenCalledTimes(Constants.ActivityTypes.length);
  });

  it('fetches subareas by orcs', async () => {
    let setDataServiceSpy = spyOn(subareaService['dataService'], 'setItemValue');
    apiServiceSpy = spyOn(subareaService['apiService'], 'get').and.returnValue(new BehaviorSubject({data:['valid_Data']}));
    let res = await subareaService.fetchSubareasByOrcs('0001');
    expect(res).toEqual({data: ['valid_Data']});
    expect(setDataServiceSpy).toHaveBeenCalledTimes(1);
  
  })

  it('clears accordion cache', async () => {
    let clearDataServiceSpy = spyOn(subareaService['dataService'], 'clearItemValue');
    subareaService.clearAccordionCache();
    expect(clearDataServiceSpy).toHaveBeenCalledTimes(8);
    expect(clearDataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.ENTER_DATA_SUB_AREA
    );
    expect(clearDataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.ACCORDION_BACKCOUNTRY_CABINS
    );
    expect(clearDataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.ACCORDION_BACKCOUNTRY_CAMPING
    );
    expect(clearDataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.ACCORDION_BOATING
    );
    expect(clearDataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.ACCORDION_DAY_USE
    );
    expect(clearDataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.ACCORDION_FRONTCOUNTRY_CABINS
    );
    expect(clearDataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.ACCORDION_FRONTCOUNTRY_CAMPING
    );
    expect(clearDataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.ACCORDION_GROUP_CAMPING
    );
  });
});
