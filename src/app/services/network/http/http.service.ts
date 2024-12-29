import { Injectable } from '@angular/core';
import {SnackBarService} from '../../snack-bar/snack-bar.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, tap, throwError} from 'rxjs';
import {ApiResponse} from '../../../models/network/ApiResponse';
import {HttpPost} from '../../../models/network/HttpPost';
import {API_ENDPOINT, AUTHENTICATE} from '../../../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,private sbService:SnackBarService) { }
  serverUrl=API_ENDPOINT;



  httpGet(queryUrl: string, params: any = null, showSnackBar = false, showSnackBarOnError = true) {
    const url = `${this.serverUrl}${queryUrl}`;
    return this.http.get(
      url,
      {
        params: params
      }
    ).pipe(
      map((res: any) => new ApiResponse(res)),
      tap((res: ApiResponse) => {
        this.onHttpSuccess(res, showSnackBar, showSnackBarOnError)
        return res
      }),
      catchError(this.handleError)
    )
  }

  httpPost({ queryUrl, params = null, body = null, showSnackBar = false, showSnackBarOnError = true }: HttpPost) {
    const url = `${this.serverUrl}${queryUrl}`;
    return this.http.post(
      url,
      body,
      {
        params: params,
      }
    ).pipe(
      map((res: any) => new ApiResponse(res)),
      tap((res: ApiResponse) => {
        this.onHttpSuccess(res, showSnackBar, showSnackBarOnError)
        return res
      }),
      catchError(this.handleError)
    )
  }

  private onHttpSuccess(res: ApiResponse, showSnackBar: boolean, showSnackBarOnError: boolean) {
    if (showSnackBar && res.showSuccesSnackBar) {
      this.sbService.openSnack(res.data)
    }

    if (showSnackBarOnError && res.showErrorSnackbar) {
      this.sbService.openSnack(res.message)
    }
  }

  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = ''
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      errorMessage = "Network Error"
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.




      if (!errorMessage) {
        errorMessage = `Something went wrong ${error.status ? `Error code : ${error.status}` : ''}`
      }

    }

    if (!errorMessage) {
      errorMessage = 'Something went wrong; Please try again later.'
    }

    this.sbService.openSnack(errorMessage)

    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorMessage));
  }
}
