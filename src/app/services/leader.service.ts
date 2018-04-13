import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular,
    private processHttpmsgService: ProcessHttpmsgService) {}

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
}

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured: true})
    .map(leaders => leaders[0]);
  }

    getLeaderIds(): Observable<number[] | any> {
      return this.getLeaders()
        .map(leaders => { return leaders.map(promotion => promotion.id)})
        .catch(error => {return error; } );
      }

}