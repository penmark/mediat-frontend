import { Component, Input } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'audio-list-card',
  template: require('./audio-list-card.html')
})
export class AudioListCard {
  @Input() audio: Item;
  loaded = false;
  error = false;
  onError(event, thumb) {
    console.log('onError', event, thumb)
    this.error = true;
  }

  onLoad(event) {
    this.loaded = true;
  }
}
