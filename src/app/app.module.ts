import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SlamMapViewerComponent } from './slam-map-viewer/slam-map-viewer.component';
import { RosService } from './ros.service';
import { ControlComponent } from './control/control.component';
import { VideoViewerComponent } from './video-viewer/video-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SlamMapViewerComponent,
    ControlComponent,
    VideoViewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule    
  ],
  providers: [RosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
