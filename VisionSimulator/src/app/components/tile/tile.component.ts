import {Component, EventEmitter, OnDestroy, Input, OnInit, Output} from '@angular/core';
import {CoordinateSet} from "../../models/CoordinateSet";
import {Subject} from "rxjs";
import {ColorChangeRequest} from "../../models/ColorChangeRequest";


@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit, OnDestroy {

  @Input() public Coordinates!: CoordinateSet;
  @Input() public Color : string = "black";
  @Input() public OriginalColor : string = this.Color;
  @Input() Events!: Subject<ColorChangeRequest>;
  @Output() public Clicked = new EventEmitter<CoordinateSet>;

  onClick() {
    this.Clicked.emit({X: this.Coordinates.X, Y: this.Coordinates.Y} as CoordinateSet);
  }

  ngOnInit(): void {
    this.Events.subscribe((ccr: ColorChangeRequest) => {
      if (ccr.X == this.Coordinates.X && ccr.Y == this.Coordinates.Y) {
        this.Color = ccr.Color;
        console.log(this.OriginalColor)
      }
    })
  }

  ngOnDestroy(): void {
    this.Events.unsubscribe();
  }
}
