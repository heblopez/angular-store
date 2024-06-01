import { Component, Input, SimpleChanges } from '@angular/core';
import { ProductComponent } from '../../../products/components/product/product.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  @Input({ required: true }) duration: number = 0;
  @Input({ required: true }) message: string = '';

  constructor() {
    // Before render(once), Not async:
    console.log('**** Constructor ****');
    console.log('-'.repeat(12));
  }

  ngOnChanges(changes: SimpleChanges) {
    // Before and during render, async functions allowed:
    console.log('**** ngOnChanges ****');
    console.log('-'.repeat(12));
    console.log(changes);
    const duration = changes['duration']
    if (duration && duration.currentValue !== duration.previousValue) this.doSomething()
  }

  ngOnInit() {
    // After render(once), async functions allowed:
    console.log('**** ngOnInit ****');
    console.log('-'.repeat(12));
    console.log('Duration => ', this.duration);
    console.log('Message => ', this.message);
  }

  ngAfterViewInit() {
    // After render, when the children of the component have already been rendered:
    console.log('**** ngAfterViewInit ****');
    console.log('-'.repeat(12));
  }

  ngOnDestroy() {
    console.log('**** ngOnDestroy ****');
    console.log('-'.repeat(12));
  }

  doSomething() {
    console.log("Change duration");
  }
}
