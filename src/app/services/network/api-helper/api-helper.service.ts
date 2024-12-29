import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';
import {RAW_LOGS, UPLOAD_LOGS} from '../../../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {

  constructor(private httpService: HttpService) { }


  getRawLogs(){
    return this.httpService.httpGet(RAW_LOGS);
  }

  getUploadLogs(){
    return this.httpService.httpGet(UPLOAD_LOGS);
  }
}
