import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './item.effects';
import { ItemService } from './item.service';
import { ItemsLoadedGuard } from './items-loaded.guard';
import { ItemListPage } from './item-list.page';
import { ItemComponent, ItemEntryComponent } from './item.component';
import { VideoListCard, ImageListCard, AudioListCard } from './cards';
import { ItemListComponent } from './item-list.component';
import { VideoModule } from '../video/video.module';
import { VideoComponent } from '../video/video.component';


@NgModule({
  imports: [
    CommonModule,
    VideoModule,
    RouterModule.forChild([
      {path: '', component: ItemListPage},
      {path: ':itemId', component: ItemComponent, canActivate: [ItemsLoadedGuard]},
      {path: 'video/:itemId', component: VideoComponent, canActivate: [ItemsLoadedGuard]}
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
