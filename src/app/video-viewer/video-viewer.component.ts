import { Component, OnInit } from '@angular/core';
import { RosService } from '../ros.service';

@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.css']
})
export class VideoViewerComponent implements OnInit {

  imageData:string ='';
  listener: any;
  constructor(private rosService: RosService) {
    this.listener = rosService.getTopicListener('/OrbImage/compressed', 'sensor_msgs/CompressedImage');
    this.listener.subscribe((msg: any) => { this.processImage(msg); });
  }

  ngOnInit(): void {
  }

  processImage(message: any) {
    this.imageData = message.data;
  }

}
