import { Component, Input, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  @Input({ required: true }) duration: number = 0;
  @Input({ required: true }) message: string = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    // NO ASYNC CALLS IN CONSTRUCTOR - BEFORE RENDERING
    console.log('Constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // BEFORE AND DURING
    console.log('ngOnChange');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit() {
    // AFTER RENDERING
    // WE CAN FETCH DATA HERE
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    this.counterRef = window.setInterval(() => {
      console.log('run interval');
      this.counter.update((prevState) => prevState + 1);
    }, 1000);
  }

  ngAfterViewInit() {
    // AFTER RENDERING
    // CHILD COMPONENTS ARE RENDERED
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    // BEFORE DESTROYING
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }

  doSomething() {
    console.log('change duration...');
  }
}
