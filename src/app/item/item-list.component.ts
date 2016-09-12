import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { Item } from './item';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { compose } from '@ngrx/core/lib/compose';
import { getItems, getItemsState } from './item.actions';
import {ItemService} from './item.service';
import {Video} from '../video/video';
import {NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

@Component({
  selector: 'video-list-card',
  template: `
<div class="card video">
  <img class="card-img-top" [src]="'data:image/png;base64,'+video.thumbs?.small?.$binary">
  <div class="card-block">
    <h4 class="card-title"><a [routerLink]="[video.id]">{{video.title}}</a></h4>
    <p class="card-text small">
      <strong>Type</strong> {{video.mimetype}}<br>
      <strong>Tags</strong> <span *ngFor="let tag of video.tags">{{tag}} </span>
    </p>
  </div>
</div>
`,
})
export class VideoListCard {
  @Input() video: Video;
}

@Component({
  selector: 'image-list-card',
  template: `
<div class="card image">
  <img class="card-img-top" [src]="imageSrc">
  <div class="card-block">
    <h4 class="cart-title"><a [routerLink]="[image.id]">{{image.title}}</a></h4>
  </div>
</div>`
})
export class ImageListCard {
  @Input() image: Item;
  get imageSrc() {
    return 'http://media.wka.se' + this.image.complete_name.substring(18);
  }
}

@Component({
  selector: 'audio-list-card',
  template: `
<div class="card audio">
  <img class="card-img-top" [src]="'data:image/png;base64,'+audio.cover_data?.$binary">
  <div class="card-block">
    <h4 class="card-title>"><a [routerLink]="[audio.id]">{{audio.title}}</a></h4>
    <p>Artist: {{audio.performer}}</p>
    <p>Album: {{audio.album}}</p>
  </div>

</div>`
})
export class AudioListCard {
  @Input() audio: Item;
}


@Component({
  selector: 'item-list',
  template: `
  <template let-item ngFor [ngForOf]="items">
    <video-list-card *ngIf="kind(item)=='video'" [video]="item"></video-list-card>
    <audio-list-card *ngIf="kind(item)=='audio'" [audio]="item"></audio-list-card>
    <image-list-card *ngIf="kind(item)=='image'" [image]="item"></image-list-card>
  </template>
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    require('./item-list.scss')
  ],
  encapsulation: ViewEncapsulation.Native
})
export class ItemListEntriesComponent {
  @Input() items;

  kind(item) {
    return item.mimetype.split('/')[0];
  }
}

@Component({
  template: '<item-list [items]="items$ | async"></item-list>'
})
export class ItemListComponent {
  items$: Observable<Item[]>;

  constructor(store: Store<any>, itemService: ItemService) {
    this.items$ = itemService.items();
  }
}
