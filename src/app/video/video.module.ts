import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VideoComponent, VideoPlayerComponent } from './video.component';
import { VideoListComponent, VideoListEntriesComponent } from './video-list.component';
import { ItemsLoadedGuard } from '../item/items-loaded.guard';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: VideoListComponent},
      {path: ':video', component: VideoComponent, canActivate: [ItemsLoadedGuard]}
    ])
  ],
  declarations: [
    VideoListComponent,
    VideoListEntriesComponent,
    VideoComponent,
    VideoPlayerComponent
  ]
})
export class VideoModule {}
