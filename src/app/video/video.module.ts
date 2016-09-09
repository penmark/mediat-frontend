import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VideoComponent, VideoPlayerComponent } from './video.component';
import { VideoListComponent, VideoListEntriesComponent } from './video-list.component';
import { ItemsLoadedGuard } from '../item/items-loaded.guard';
import { DurationPipe } from '../item/duration.filter';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: VideoListComponent},
      {path: ':video', component: VideoComponent, canActivate: [ItemsLoadedGuard]}
    ]),
    //EffectsModule.run(VideoEffects),
  ],
  declarations: [
    VideoListComponent,
    VideoListEntriesComponent,
    VideoComponent,
    VideoPlayerComponent,
    DurationPipe
  ]
})
export class VideoModule {}
