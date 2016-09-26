import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent, VideoPlayerComponent, TranscodeProgress } from './video.component';
import { MediaModule } from '../media/media.module';


@NgModule({
  imports: [
    CommonModule,
    MediaModule
  ],
  declarations: [
    VideoComponent,
    VideoPlayerComponent,
    TranscodeProgress
  ],
  exports: [
    VideoComponent
  ]
})
export class VideoModule {}
