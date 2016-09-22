import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent, VideoPlayerComponent } from './video.component';
import { MediaModule } from '../media/media.module';


@NgModule({
  imports: [
    CommonModule,
    MediaModule
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
