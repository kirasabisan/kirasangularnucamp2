import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { ProcessHttpmsgService } from './process-httpmsg.service';


import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular,
  private processHttpmsgService: ProcessHttpmsgService) {}

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();

  }

  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions', id).get();
}

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
    .map(dishes => dishes[0]);

}
getPromotionIds(): Observable<number[] | any> {
  return this.getPromotions()
    .map(promotions => { return promotions.map(promotion => promotion.id)})
    .catch(error => {return error; } );
  }
}
