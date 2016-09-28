import { Injectable } from '@angular/core'
import { Headers, URLSearchParams } from '@angular/http'
import { Seq } from 'immutable'
import { Item } from '../item/item'
import { Observable } from 'rxjs'
import { HttpService } from './http.service'


export interface MongoSearch {
  limit?: number;
  skip?: number;
  query?: {};
  sort?: {};
  projection?: {};
}

const API_URL = 'https://api.wka.se/mediat';

@Injectable()
export class ApiService {
  constructor(private http: HttpService) {
  }

  items(ids?: string[], limit = 0) {
    const query: MongoSearch = {
      projection: {
        thumbs: 0,
        cover_data: 0
      },
      limit,
      sort: {title: 1}
    };
    if (ids) {
      query.query = {_id: {$in: ids}};
    }
    return this.get(query)
  }

  video() {
    return this.get({query: {type: 'video'}});
  }

  audio() {
    return this.get({query: {type: 'audio'}});
  }

  transcode(item) {
    return this.http.post(`${API_URL}/item/${item._id}/transcode`, item)
  }

  get(query: MongoSearch): Observable<Item[]> {
    const search = new URLSearchParams();
    Seq<any>(query).forEach((value: any, key: string) => {
      search.set(key, JSON.stringify(value))
    });
    return this.http
      .get(API_URL + '/item', {search})
      .map(r => r.json())
  }

}
