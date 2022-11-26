import { Component, Input } from '@angular/core';

@Component({
  selector: 'MovesHistoryComponent',
  templateUrl: './moves-history.component.html',
  styleUrls: ['./moves-history.component.scss']
})
export class MovesHistoryComponent {
  @Input()
  public moves: string[] = [];
}
