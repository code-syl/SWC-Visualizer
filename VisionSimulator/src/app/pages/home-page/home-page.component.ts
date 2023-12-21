import { Component } from '@angular/core';
import {CoordinateSet} from "../../models/CoordinateSet";
import {Subject} from "rxjs";
import {ColorChangeRequest} from "../../models/ColorChangeRequest";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  public Tiles: CoordinateSet[][] = [];
  private sensorRange = 0;
  eventsSubject: Subject<ColorChangeRequest> = new Subject<ColorChangeRequest>();

  constructor() {
    for (let y = 0; y < 20; y++) {
      this.Tiles.push([]);

      for (let x = 0; x < 20; x++ ) {
        this.Tiles[y].push({X: x, Y: y} as CoordinateSet)
      }
    }
  }

  onTileClick(coordinates: CoordinateSet) {
    const xMin: number = Math.max(coordinates.X - this.sensorRange, 0);
    const xMax: number = Math.min(coordinates.X + this.sensorRange, this.Tiles.length);
    const yMin: number = Math.max(coordinates.Y - this.sensorRange, 0);
    const yMax: number = Math.min(coordinates.Y + this.sensorRange, this.Tiles[0].length);
    let cords: CoordinateSet[] = [];

    for (let y = yMin; (y <= yMax) && (y < this.Tiles.length); y++) {
      for (let x = xMin; (x <= xMax) && (x < this.Tiles[0].length); x++) {
        if (x < 0 || y < 0) {
          continue;
        }

        const inDistance: boolean =
          Math.sqrt(Math.pow((x - coordinates.X),2) + Math.pow((y - coordinates.Y),2)) <= this.sensorRange;
        if (inDistance) {
          cords.push({X: x, Y: y} as CoordinateSet)
        }
      }
    }

    console.log(cords);
    cords.forEach((c) => this.emitToTile({X: c.X, Y: c.Y, Color: "darkgreen"} as ColorChangeRequest))
    this.emitToTile({X: coordinates.X, Y: coordinates.Y, Color: "darkred"} as ColorChangeRequest);
  }

  onSensorChange(n: number) {
    this.sensorRange = n;
  }

  emitToTile(ccr: ColorChangeRequest) {
    this.eventsSubject.next(ccr);
  }
}
