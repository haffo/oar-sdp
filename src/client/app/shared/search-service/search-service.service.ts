import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';
import { Config } from '../config/env.config';


/**
 * This class provides the Search service with methods to search for records from tha rmm.
 */
@Injectable()
export class SearchService {
  private RestAPIURL: string = Config.API;


  /**
   * Creates a new SearchService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhrase(searchValue:string, searchTaxonomyKey:string, queryAdvSearch:string): Observable<string[]> {
    if ((queryAdvSearch === 'yes' && (!(_.includes(searchValue, 'searchphrase'))))) {

      //return this.http.get('http://10.200.222.250:8082/RMMApi/records/advancedsearch?' + searchValue)
      //return this.http.get('http://10.200.222.250:8082/oar-rmm-service/records')
      //return this.http.get('http://localhost:9090/RMMApi/records/advancedsearch?' + searchValue)
      return this.http.get(this.RestAPIURL + 'oar-rmm-service/records?' + searchValue)
    .map((res: Response) => res.json().ResultData)
        .catch((error: any) => Observable.throw(error.json()));
    } else {
      let params: URLSearchParams = new URLSearchParams();
        params.set('searchphrase', searchValue);
        params.set('topic.tag', searchTaxonomyKey);

        return this.http.get(this.RestAPIURL + 'oar-rmm-service/records?',
        {
            search: params

      })
          .map((res: Response) => res.json().ResultData)
          .catch((error: any) => Observable.throw(error.json()));
      }
    }

  /**
    * Handle HTTP error

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
   */
}

