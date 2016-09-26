import { Component, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from './item';
import { Observable } from 'rxjs';
import { ItemService } from './item.service';
import { Seq } from 'immutable';
import {FilterItems} from './item.actions';
import {ItemSearch} from './item.actions';


@Component({
  template: `
  <div class="container-fluid">
  <div class="row">
    <div class="col-sm-9">
      <a href (click)="filter({k: 'type', v: 'video'})">video</a>
      <a href (click)="filter({k: 'type', v: 'audio'})">audio</a>
      <a href (click)="filter({k: 'type', v: 'image'})">image</a>
      <a href (click)="filter({k: 'mimetype', v: 'video/mp4'})">streamable video</a>
      <a href (click)="filter(null)">all</a>
    </div>
    <div class="col-sm-3">
      <input type="search" #query class="form-control pull-right search" (keyup)="search.emit(query.value)">
    </div>
  </div>
  </div>
  <item-list [items]="items$ | async"></item-list>`
})
export class ItemListPage {
  items$: Observable<Seq.Indexed<Item>>;
  search = new EventEmitter();
  searcher: Observable<any>;

  constructor(public itemService: ItemService, private store: Store<any>) {
    this.items$ = itemService.filtered();
    this.searcher = this.search.debounceTime(300)
      .map(query => {
        const re = new RegExp(query, 'i');
        const search = item => {
          return re.test(item.complete_name)
        };
        return new ItemSearch(search)
      })
      .subscribe(store)
  }

  filter(f) {
    const filter = f ? item => item[f.k] === f.v : null;
    this.store.dispatch(new FilterItems(filter));
    return false
  }
}
