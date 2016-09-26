import { Component } from '@angular/core';
import { Item } from './item';
import { Observable } from 'rxjs';
import { ItemService } from './item.service';
import { Seq } from 'immutable';


@Component({
  template: `
  <button (click)="items$ = itemService.video()">video</button><br>
  <button (click)="items$ = itemService.audio()">audio</button><br>
  <button (click)="items$ = itemService.image()">image</button><br>
  <item-list [items]="items$ | async"></item-list>`
})
export class ItemListPage {
  items$: Observable<Seq.Indexed<Item>>;

  constructor(public itemService: ItemService) {
    this.items$ = itemService.items();
  }


}
