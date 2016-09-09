import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import * as videoActions from './video.actions';
import * as itemActions from '../item/item.actions';
import { ItemService } from '../item/item.service';

@Injectable()
export class VideoEffects {
  constructor(private updates$: Actions, private itemService: ItemService) { }
}
