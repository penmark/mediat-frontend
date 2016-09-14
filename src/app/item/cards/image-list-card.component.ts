import { Component, Input } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'image-list-card',
  template: require('./image-list-card.html')
})
export class ImageListCard {
  @Input() image: Item;
  get imageSrc() {
    return 'https://media.wka.se' + this.image.complete_name.substring(18);
  }
}
