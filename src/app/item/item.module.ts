import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './item.effects';
import { ItemService } from './item.service';
import { ItemsLoadedGuard } from './items-loaded.guard';
import { ItemListPage } from './item-list.page';
import { ItemComponent } from './item.component';
import { ItemEntryComponent } from './item.component';
import { VideoListCard, ImageListCard, AudioListCard } from './cards';
import { ItemListComponent } from './item-list.component';
import { ItemComponent, ItemEntryComponent } from './item.component';
import { VideoModule } from '../video/video.module';


@NgModule({
  imports: [
    CommonModule,
    VideoModule,
    RouterModule.forChild([
      {path: '', component: ItemListPage},
      {path: ':itemOid', component: ItemComponent, canActivate: [ItemsLoadedGuard]}
    ]),
    EffectsModule.run(ItemEffects)
  ],
  declarations: [
    ItemListPage,
    ItemListComponent,
    ItemComponent,
    ItemEntryComponent,
    VideoListCard,
    ImageListCard,
    AudioListCard
  ],
  providers: [
    ItemService,
    ItemsLoadedGuard
  ]
})
export class ItemModule {
}
