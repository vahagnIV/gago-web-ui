import { Injectable } from '@angular/core';

declare var ROSLIB: any;

@Injectable({
  providedIn: 'root'
})
export class RosService {

  ros: any;
  
  isInitialized: boolean = false;

  constructor() {
    this.ros = new ROSLIB.Ros({
      // url: 'ws://localhost:9090'
      url: 'ws://localhost:9090'
    });

    this.ros.on('connection', () => {
      this.isInitialized = true;
      console.log('Connected to websocket server.');
    });

    this.ros.on('error', function (error: any) {
      console.log('Error connecting to websocket server: ', error);
    });

    this.ros.on('close', function () {
      console.log('Connection to websocket server closed.');
    });
  }

  public getTopicListener(topicName: string, messageType: string): any {
    var listener = new ROSLIB.Topic({
      ros: this.ros,
      name: topicName,
      messageType: messageType
    });
    return listener;
  }

  public getServiceHandle(serviceName: string, messageType: string): any {
    console.log('service requested');
    var service = new ROSLIB.Service({
      ros: this.ros,
      name: serviceName,
      serviceType: messageType
    });
    return service;
  }
}
