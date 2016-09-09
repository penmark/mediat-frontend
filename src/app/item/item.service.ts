import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ItemService {
  constructor(private http: Http) {}
  items() {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + localStorage.getItem('credentials'));
    const search = new URLSearchParams();
    search.set('projection', JSON.stringify({
      title: 1,
      mimetype: 1,
      modified: 1,
      created: 1,
      file_modified: 1,
      'thumbs.small': 1,
      tags: 1
    }));
    search.set('limit', '50');
    search.set('sort', JSON.stringify([['modified', -1]]));
    return this.http
      .get('https://api.wka.se/mediat/item/', {search, headers})
      .map(r => r.json())
      .map(videos => videos.map(v => this.toItem(v)))
  }

  videos() {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + localStorage.getItem('credentials'));
    const search = new URLSearchParams();
    search.set('query', JSON.stringify({mimetype: {$regex: '^video'}}));
    search.set('projection', JSON.stringify({'thumbs.large': 0}));
    return this.http
      .get('https://api.wka.se/mediat/item/', {search, headers})
      .map(r => r.json())
      .map(videos => videos.map(v => this.toItem(v)))
  }

  private toItem(itemData) {
    itemData.id = itemData._id.$oid;
    itemData.modified = new Date(itemData.modified.$date);
    itemData.created = new Date(itemData.created.$date);
    itemData.file_modified = new Date(itemData.file_modified.$date);
    return itemData
  }
}
