import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Item } from './item';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { compose } from '@ngrx/core/lib/compose';
import { getItems, getItemsState } from './item.actions';

@Component({
  selector: 'item-list',
  template: `
<div class="card" *ngFor="let item of items">
  <img class="card-img-top" [src]="'data:image/jpg;base64,'+item.thumbs?.small?.$binary">
  <div class="card-block">
    <h4 class="card-title">{{item.title}}</h4>
    <p class="card-text small">
      <strong>Type</strong> {{item.mimetype}}<br>
      <strong>Tags</strong> <span *ngFor="let tag of item.tags">{{tag}} </span>
    </p>
  </div>
</div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListEntriesComponent {
  @Input() items;
}

@Component({
  template: '<item-list [items]="items$ | async"></item-list>'
})
export class ItemListComponent {
  items$: Observable<Item[]>;

  constructor(store: Store<any>) {
    this.items$ = store.let(compose(getItems(), getItemsState()));
  }
}
