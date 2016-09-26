import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { Item } from './item';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { compose } from '@ngrx/core/lib/compose';


@Component({
  selector: 'item-list',
  template: `
  <template let-item ngFor [ngForOf]="items">
    <video-list-card *ngIf="kind(item) == 'video'" [video]="item"></video-list-card>
    <audio-list-card *ngIf="kind(item) == 'audio'" [audio]="item"></audio-list-card>
    <image-list-card *ngIf="kind(item) == 'image'" [image]="item"></image-list-card>
  </template>
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    require('./item-list.scss')
  ],
  encapsulation: ViewEncapsulation.Native
})
export class ItemListComponent {
  @Input() items;

  kind(item) {
    return item.mimetype.split('/')[0];
  }
}
