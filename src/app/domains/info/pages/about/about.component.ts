import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../../../shared/components/counter/counter.component';
import { WaveAudioComponent } from '../../components/wave-audio/wave-audio.component';

@Component({
  selector: 'app-about',
  imports: [CounterComponent, CommonModule, WaveAudioComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  duration = signal(1000);
  message = signal('Hello world!');

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.valueAsNumber;
    this.duration.set(newValue);
  }

  changeMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.message.set(newValue);
  }
}
