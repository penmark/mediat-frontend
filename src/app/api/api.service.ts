import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Seq } from 'immutable';
import { Item } from '../item/item';
import { Observable } from 'rxjs';


export interface MongoSearch {
  limit?: number;
  skip?: number;
  query?: {};
  sort?: Array[];
  projection: {};
}

@Injectable()
export class ApiService {
  constructor(private http: Http) {
  }

  index() {
    const projection = {
      title: 1,
      mimetype: 1,
      modified: 1
    };
    return this.get({projection, sort: [['modified', -1]]})
  }

  items(ids?: string[], limit = 50) {
    const query: MongoSearch = {
      projection: {
        title: 1,
        mimetype: 1,
        modified: 1,
        created: 1,
        file_modified: 1,
        'thumbs.small': 1,
        tags: 1,
        complete_name: 1,
        cover_data: 1,
        performer: 1,
        album: 1
      },
      limit,
      sort: [['modified', -1]]
    };
    if (ids) {
      query.query = {_id: {$in: ids.map(id => ({$oid: id}))}};
    }
    return this.get(query)
  }

  get(query: MongoSearch): Observable<Item[]> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + localStorage.getItem('credentials'));
    const search = new URLSearchParams();
    Seq(query).forEach((v, k) => { search.set(k, JSON.stringify(v)) });
    return this.http
      .get('https://api.wka.se/mediat/item/', {search, headers})
      .map(r => r.json())
      .map(items => items.map(v => this.toItem(v)))
  }

  private toItem(rawData: Item) {
    rawData.id = rawData._id.$oid;
    rawData.modified = new Date(rawData.modified.$date);
    return rawData
  }
}
