import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  @Input({ required: true }) duration: number = 0;
  @Input({ required: true }) message: string = '';

  constructor(){
    // Before render:
    console.log("**** Constructor ****");
    console.log("-".repeat(12));
  }

  ngOnChanges(changes: SimpleChanges){
    // Before and during render:
    console.log("**** ngOnChanges ****");
    console.log("-".repeat(12));
    console.log(changes);
  }
}
