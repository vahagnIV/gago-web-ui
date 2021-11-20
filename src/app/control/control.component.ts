import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { RosService } from '../ros.service';

declare var ROSLIB: any;

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  motorControl: any;
  state: string = '';
  constructor(private rosService: RosService) {

    this.motorControl = this.rosService.getServiceHandle('/Move', 'motor_control/MoveRequest');

  }

  ngOnInit(): void {
  }

  private performAction(action: string) {
    var request = new ROSLIB.ServiceRequest({ direction: action });

    this.motorControl.callService(request, (result: any) => {
      console.log(result);
    });
    this.state = action;

  }

  @HostListener('window:keydown', ['$event'])
  handleMoveEvent(event: KeyboardEvent) {

  

    let action: string = '';
    if (event.key == 'ArrowUp') {
      action = 'FORWARD';
    }
    else if (event.key == 'ArrowDown') {
      action = 'BACKWARD';
    }
    else if (event.key == 'ArrowLeft') {
      action = 'LEFT';
    }
    else if (event.key == 'ArrowRight') {
      action = 'RIGHT';
    }
    else {
      return;
    }
    if (this.state == action) { return; }
    

    event.stopPropagation();
    this.performAction(action);

  }

  @HostListener('window:keyup', ['$event'])
  handleStopEvent(event: KeyboardEvent) {
    event.stopPropagation();
    if (event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowLeft' || event.key == 'ArrowRight') {
      this.performAction('STOP');

    }

  }



}
