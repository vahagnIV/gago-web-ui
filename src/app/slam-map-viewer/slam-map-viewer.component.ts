import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TrackingInfo } from './messages/tracking-info';
import './messages/tracking-info'
import { MessageType } from './messages/message-type'
import { Graph } from './gl-graph/graph'
import { KeyFrameNode } from './gl-graph/keyframe-node';
import { KeyFrameCreated } from './messages/keyframe-created';
import { MapPointNode } from './gl-graph/map-point-node';
import { MapPointCreated } from './messages/map-point-created';
import { KeyFrameDeleted } from './messages/keyframe-deleted'
import { MapPointDeleted } from './messages/map-point-deleted';
import { KeyFramePositionUpdated } from './messages/keyframe-position-updated';
import { MapPointGeometryUpdated } from './messages/map-point-geometry-updated';

declare var ROSLIB: any;

@Component({
  selector: 'app-slam-map-viewer',
  templateUrl: './slam-map-viewer.component.html',
  styleUrls: ['./slam-map-viewer.component.css']
})
export class SlamMapViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('glCanvas') canvas: any;
  gl: any;
  listener: any;
  graph: Graph;

  base64ToArrayBuffer(base64: string): ArrayBuffer {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  processMessage(message: any) {
    var arr = this.base64ToArrayBuffer(message.data);
    var view = new DataView(arr);
    if (arr.byteLength != message.layout.dim[0].size) {
      alert('error');
    }

    var type: MessageType = view.getUint32(0, true);


    switch (type) {
      case MessageType.MAP_CREATED: {

        break;
      }
      case MessageType.TRACKING_INFO: {
        var msg = new TrackingInfo(view);
        this.graph.draw();

        break;
      }
      case MessageType.KEYFRAME_CREATED: {
        let msg = new KeyFrameCreated(view);
        this.graph.addKeyFrame(new KeyFrameNode(msg));
        break;
      }
      case MessageType.MAP_POINT_CREATED: {
        let msg = new MapPointCreated(view);
        this.graph.addMapPoint(new MapPointNode(msg));
        break;
      }
      case MessageType.KEYFRAME_DELETED: {
        let msg: KeyFrameDeleted = new KeyFrameDeleted(view);
        this.graph.deleteKeyFrame(msg.id);
        break;
      }
      case MessageType.MAP_POINT_DELETED: {
        let msg: MapPointDeleted = new MapPointDeleted(view);
        this.graph.deleteMapPoint(msg.id);
        break;
      }
      /*case MessageType.OBSERVATION_ADDED: {
        var msg = {
          frame_id: view.getBigUint64(4, true),
          map_point_id: view.getBigUint64(12, true),
        }
        break;
      }
      case MessageType.OBSERVATION_DELETED: {
        var msg = {
          frame_id: view.getBigUint64(4, true),
          map_point_id: view.getBigUint64(12, true),
        }
        break;
      }*/
      case MessageType.KEYFRAME_POSITION_UPDATED: {
        let msg = new KeyFramePositionUpdated(view);
        let kf = this.graph.getKeyFrame(msg.id);
        if (kf) {
          kf.updatePosition(msg);
        }
        break;

      }
      /*case MessageType.KEYFRAME_COVISIBILITY_UPDATED: {
        break;
      }*/
      case MessageType.MAP_POINT_GEOMETRY_UPDATED: {
        let msg = new MapPointGeometryUpdated(view);
        let mp = this.graph.getMapPoint(msg.id);
        if (mp) {
          mp.updatePosition(msg.position);
        }
        break;
      }


    }
  }

  initGl(): void {

    this.canvas.nativeElement.style.width = '100%';
    this.canvas.nativeElement.style.height = '100%';
    // ...then set the internal size to match
    this.canvas.nativeElement.width = this.canvas.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight;
    // Initialize the GL context
    this.gl = this.canvas.nativeElement.getContext("webgl2");


    // Only continue if WebGL is available and working
    if (this.gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }

    // Set clear color to black, fully opaque
    this.gl.clearColor(0.5, 0.5, 0.5, 1.0);
    // Clear the color buffer with specified clear color
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.graph.setGlContext(this.gl);
  }

  initRos(): void {
    var ros = new ROSLIB.Ros({
      url: 'ws://localhost:9090'
    });

    ros.on('connection', function () {
      console.log('Connected to websocket server.');
    });

    ros.on('error', function (error: any) {
      console.log('Error connecting to websocket server: ', error);
    });

    ros.on('close', function () {
      console.log('Connection to websocket server closed.');
    });

    this.listener = new ROSLIB.Topic({
      ros: ros,
      name: '/orb_slam3',
      messageType: 'std_msgs/UInt8MultiArray'
    });
    this.listener.subscribe((msg: any) => { this.processMessage(msg); });
    // this.tt = new
  }

  ngAfterViewInit() {

    this.initGl();
    this.initRos();

  }

  constructor() {
    this.graph = new Graph();

  }



  ngOnInit(): void {

  }

}
