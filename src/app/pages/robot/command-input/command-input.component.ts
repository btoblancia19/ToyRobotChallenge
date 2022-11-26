import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EnumCommands, EnumFaceDirections } from 'src/app/models/enums/commands.enum';
import { CurrentCoordinates } from 'src/app/models/interfaces/robot.interface';
import { RobotService } from 'src/app/services/RobotService/robot.service';

@Component({
  selector: 'CommandInputComponent',
  templateUrl: './command-input.component.html',
  styleUrls: ['./command-input.component.scss']
})
export class CommandInputComponent implements OnInit {
  @Input()
  currentCoordinates: CurrentCoordinates = <CurrentCoordinates>{};

  // @Output()
  // commandInput:EventEmitter<CurrentCoordinates> = new EventEmitter<CurrentCoordinates>();
  @Output()
  updateCurrentCoordinates:EventEmitter<CurrentCoordinates> = new EventEmitter<CurrentCoordinates>();
  @Output()
  emitCommand:EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private robotService: RobotService) { }

  ngOnInit() {
  }
  
  onEnter(commandValue: string): void {

    // Check if player place a coordinates
    let currentCoordinate: CurrentCoordinates = this.robotService.executeCommand(commandValue, this.currentCoordinates);
    if (!!currentCoordinate.coordinates) {
      console.log(currentCoordinate);
      this.emitCommand.emit(commandValue);
      this.updateCurrentCoordinates.emit(currentCoordinate);
    } else {
      alert('Please place your first robot coordinates!');
    }
  }


}
