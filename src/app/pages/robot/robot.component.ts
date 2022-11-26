import { Component, OnInit } from '@angular/core';
import { EnumCommands, EnumDirections, EnumFaceDirections } from 'src/app/models/enums/commands.enum';
import { CurrentCoordinates } from 'src/app/models/interfaces/robot.interface';
import { RobotService } from 'src/app/services/RobotService/robot.service';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss']
})
export class RobotComponent implements OnInit {

  public currentCoordinates: CurrentCoordinates = <CurrentCoordinates>{};
  public movesHistory: string[] = [];

  constructor() {
  }
  ngOnInit(): void {
  }

  public updateCoordinates(currentCoordinates: CurrentCoordinates) { 
    console.log(currentCoordinates);
    if (!!currentCoordinates.coordinates) {
        this.currentCoordinates = currentCoordinates;
    }
  }

  public executeAlertLastCommand(command: string) {
    this.movesHistory.push(command);
    if (command === EnumCommands.Report) {
      let currX: number =  this.currentCoordinates.coordinates.x;
      let currY: number  =  this.currentCoordinates.coordinates.y;
      let currentDirection: EnumDirections =  this.currentCoordinates.direction;
      alert('REPORT CURRENT COORDINATES: X = '+currX+' | Y = '+currY+' | Direction = '+currentDirection);
    }
  }


  // public performCommand(commandInputted: string) {
  //   let isCommandValid:boolean = this.checkPlaceCommand(commandInputted);
  //   if (isCommandValid) {
    
  //   switch (commandInputted) {
      
  //       // execute change 90° anticlockwise/counterclockwise face direction
  //       case EnumFaceDirections.Left:
  //       break;

  //       // execute change 90° clockwise face direction
  //       case EnumFaceDirections.Right:
  //       break;

  //       // execute move to facing direction 
  //       case EnumCommands.Move:
  //       break;
        
  //       //execute report current direction
  //       case EnumCommands.Report:
  //       break;
        
  //       /**
  //        * Check if PLACE Command is Correct with X,Y,DIRECTION Data
  //        */
  //       default:
  //       break;
  //     }
  //   }
  // }

  // private checkPlaceCommand(commandInputted: string): boolean {
  //   let isValidCommand: boolean = false;
  //   if (commandInputted.startsWith(EnumCommands.Place)) {
      
  //   }
  //   return isValidCommand;
  // }
}
