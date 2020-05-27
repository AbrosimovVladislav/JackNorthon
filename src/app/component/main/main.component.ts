import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  safeURL;
  // videoUrl = 'https://www.youtube.com/embed/1ozGKlOzEVc';
  videoUrl = 'https://www.youtube.com/embed/videoseries?list=PLMXAdXb6bgwbrhhN9o_Q3z23yLFN2CkD0';
  videos: any[] = [];

  constructor(private sanitizer: DomSanitizer) {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  ngOnInit(): void {
    this.videos.push(this.videoUrl);
    this.videos.push(this.videoUrl);
    this.videos.push(this.videoUrl);
    this.videos.push(this.videoUrl);
    this.videos.push(this.videoUrl);
  }


}
