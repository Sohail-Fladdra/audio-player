import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {

  audioIsPlaying: boolean = true;
  firstTime: boolean = true;
  favorited: boolean = false;
  loop: boolean = false;
  sliderValue: any = 0;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.trackSliderValueChanges();
    this.detectEndOfAudio();

    document.addEventListener('touchend', (event) => {
      this.enableFullScreen();
    });


  }


  togglePlay(stream: any) {
    if (this.firstTime && this.audioIsPlaying) {
      this.firstTime = false;
      stream.play();
      this.audioIsPlaying = false;
    }
    else {
      (this.audioIsPlaying) ? stream.play() : stream.pause();
      this.audioIsPlaying = !this.audioIsPlaying;
    }
  }

  seekTo(stream: any, slider: any) {
    let seekto = stream.duration * (parseInt(slider.value as string) / 100);
    stream.currentTime = seekto;
  }

  toggleLoop(stream: any) {
    this.loop = !this.loop;
    stream.loop = this.loop;
  }

  trackSliderValueChanges(): void {
    let curr_track: HTMLAudioElement = document.getElementsByTagName('audio')[0];
    curr_track.addEventListener('timeupdate', () => {
      let seekPosition = 0;
      let curr_track: any = document.getElementsByTagName('audio')[0];
      if (!isNaN(curr_track.duration)) {
        seekPosition = (curr_track.currentTime / curr_track.duration) * 100;
        console.log('seek position', seekPosition);
        this.sliderValue = seekPosition;
      }
    });
  }

  seekUpdate() {
    let seekPosition = 0;
    let curr_track: any = document.getElementsByTagName('audio')[0];
    console.log(curr_track);

    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      console.log('seek position', seekPosition);

      // @ts-ignore
      // this.slider.value = seekPosition;
      // this.sliderValue = seekPosition;
      this.sliderValue = seekPosition + this.sliderValue + 6;
      console.log('slider value ', this.sliderValue);
      // this.sliderValue = 4;


      // let currentMinutes = Math.floor(curr_track.currentTime / 60);
      // let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      // let durationMinutes = Math.floor(curr_track.duration / 60);
      // let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

      // if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      // if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      // if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      // if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      // curr_time.textContent = currentMinutes + ":" + currentSeconds;
      // total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  detectEndOfAudio() {
    let curr_track: HTMLAudioElement = document.getElementsByTagName('audio')[0];
    curr_track.addEventListener('ended', () => {
      this.audioIsPlaying = true;
      this.firstTime = true;
    });
  }

  addToFavorite() {
    this.favorited = !this.favorited;
  }

  enableFullScreen() {
    document.documentElement.requestFullscreen().then(v => console.log('working')).catch((e) => console.log('er ', e));
  }

}
