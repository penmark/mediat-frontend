import { Component, Input } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'video-list-card',
  template: require('./video-list-card.html')
})
export class VideoListCard {
  @Input() video: Item;
}

