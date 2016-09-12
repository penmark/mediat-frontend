import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './item.effects';
import { ItemService } from './item.service';
import { DurationPipe } from './duration.filter';
import { ItemsLoadedGuard } from './items-loaded.guard';
import { ItemListComponent, ItemListEntriesComponent } from './item-list.component';
import { ItemComponent } from './item.component';
import {ItemEntryComponent} from './item.component';
import {VideoListCard} from './item-list.component';
import {ImageListCard} from './item-list.component';
import {AudioListCard} from './item-list.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ItemListComponent},
      {path: ':itemOid', component: ItemComponent, canActivate: [ItemsLoadedGuard]}
    ]),
    EffectsModule.run(ItemEffects)
  ],
  declarations: [
    ItemListComponent,
    ItemListEntriesComponent,
    ItemComponent,
    ItemEntryComponent,
    VideoListCard,
    ImageListCard,
    AudioListCard
  ],
  providers: [
    ItemService,
    ItemsLoadedGuard
  ],
  exports: []
})
export class ItemModule {
}
