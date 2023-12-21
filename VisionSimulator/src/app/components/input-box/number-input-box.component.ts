import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-number-input-box',
  template: `
    <label for="{{Id}}">Sensor Range:</label>
    <input #box (keyup)="onKey(box.value)" (click)="onKey(box.value)" id="{{Id}}" min="{{Min}}" max="{{Max}}"
           pattern="[^0-9]+" name="{{Id}}" type="number"/>
  `,
})
export class NumberInputBoxComponent {
  values = '';
  @Input() Label: string = '';
  @Input() Id: string = '';
  @Input() Min: string = '1';
  @Input() Max: string = '10';
  @Output() public Changed = new EventEmitter<number>;

  onKey(value: string) {
    this.values = value;
    let n: number = Number(this.values);
    this.Changed.emit(!isNaN(n) ? n : 0);
  }
}
