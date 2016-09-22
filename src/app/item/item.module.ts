import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { MediaModule } from '../media/media.module';
import { ItemEffects } from './item.effects';
import { ItemService } from './item.service';
import { ItemsLoadedGuard } from './items-loaded.guard';
import { ItemListPage } from './item-list.page';
import { ItemComponent, ItemEntryComponent } from './item.component';
import { VideoListCard, ImageListCard, AudioListCard } from './cards';
import { ItemListComponent } from './item-list.component';
import { VideoModule } from '../video/video.module';
import { VideoComponent } from '../video/video.component';
import { DurationPipe } from './duration.pipe';


@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    VideoModule,
    RouterModule.forChild([
      {path: '', component: ItemListPage},
      {path: ':itemId', component: ItemComponent, canActivate: [ItemsLoadedGuard]},
      {path: 'video/:itemId', component: VideoComponent, canActivate: [ItemsLoadedGuard]}
    ]),
    EffectsModule.run(ItemEffects),
    MediaModule
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
  ],
  exports: [
  ]
})
export class ItemModule {
}
