import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent, VideoPlayerComponent } from './video.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    VideoComponent,
    VideoPlayerComponent
  ],
  exports: [
    VideoComponent
  ]
})
export class VideoModule {}
