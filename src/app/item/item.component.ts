import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {ItemService} from './item.service';
import {Item} from './item';

@Component({
  selector: 'item-entry',
  template: '<pre>{{_item | json}}</pre>'
})
export class ItemEntryComponent {
  @Input() item;
  get _item() {
    return Object.assign({}, {thumbs: undefined}, this.item);
  }
}

@Component({
  template: '<item-entry [item]="item$ | async"></item-entry>'
})
export class ItemComponent {
  item$: Observable<Item>;

  constructor({params}: ActivatedRoute, itemService: ItemService) {
    console.log('itemcomponent')
    this.item$ = params.select<string>('itemOid').switchMap(id => itemService.item(id));
  }
}
