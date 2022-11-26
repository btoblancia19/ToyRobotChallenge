import { Injectable } from '@angular/core';
import { EnumCommands, EnumDirections, EnumFaceDirections } from 'src/app/models/enums/commands.enum';
import { EnumCoordinateLimit, EnumCoordinateType } from 'src/app/models/enums/coordinate.enum';
import { Coordinate, CurrentCoordinates } from '../../models/interfaces/robot.interface';
@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private restricatedCoordinates: Coordinate[] = [
    {x: 0, y: 0, type: EnumCoordinateType.Restricted, limit: EnumCoordinateLimit.Below},
    {x: 5, y: 5, type: EnumCoordinateType.Restricted, limit: EnumCoordinateLimit.Above},
  ];

  private validDirections: EnumDirections[] = Object.values(EnumDirections);

  constructor() { 
  }



  private getNewCoordinates(currentCoordinates: CurrentCoordinates): CurrentCoordinates {
    let newCoordinates: CurrentCoordinates = currentCoordinates;
    switch (currentCoordinates.direction) {
      case EnumDirections.North:
        newCoordinates.coordinates.y++;
        break
      case EnumDirections.East:
        newCoordinates.coordinates.x++;
        break
      case EnumDirections.South:
        newCoordinates.coordinates.y--;
        break
      case EnumDirections.West:
        newCoordinates.coordinates.x--;
        break
    }
    return newCoordinates;
  }

  private executeMove(currentCoordinates: CurrentCoordinates): CurrentCoordinates {
    let newCoordinates: CurrentCoordinates = currentCoordinates;
    //Check Coordinates if not on the restricted coordinates
    if (!this.isRestrictedCoordinates(newCoordinates.coordinates)) {
      newCoordinates = this.getNewCoordinates(currentCoordinates);
    } else {
      alert('Oh no!! Your move will put you on the restricted area, please select other command.');
    }
    return newCoordinates;
  }

  private executeFaceDirection(commandInputted: EnumFaceDirections, currentCoordinates: CurrentCoordinates): CurrentCoordinates  {
    
    let returnValue: CurrentCoordinates = currentCoordinates;
    let currentIndex: number = this.validDirections.findIndex((a)=> a === returnValue.direction);
    switch (commandInputted) {
      case EnumFaceDirections.Left:
        currentIndex--
        break;
      case EnumFaceDirections.Right:
        currentIndex++
        break;
    }

    // put early return to handle the negative values for current index
    if (currentIndex < 0) {
      returnValue.direction = EnumDirections.West;
      return returnValue;
    } else if (currentIndex > this.validDirections.length - 1) {
      returnValue.direction =  EnumDirections.North;
      return returnValue;
    }

    returnValue.direction = this.validDirections[currentIndex];
    return returnValue;
  }

  public executeCommand(commandInputted: string, currentCoordinates: CurrentCoordinates): CurrentCoordinates {
    let returnValue: CurrentCoordinates = <CurrentCoordinates>currentCoordinates;
    // check if valid place command
    if (commandInputted.startsWith(EnumCommands.Place)) {
      returnValue = this.executePlaceCommand(commandInputted);
    } else {
      console.log(commandInputted);
      switch (commandInputted) {
          // execute change 90° anticlockwise/counterclockwise/clockwise face direction
          case EnumFaceDirections.Left:

          // execute change 90° clockwise face direction
          case EnumFaceDirections.Right:
            returnValue = this.executeFaceDirection(commandInputted, currentCoordinates);
          break;

          // execute move to facing direction 
          case EnumCommands.Move:
            this.executeMove(currentCoordinates);
          break;
          
          //execute report current direction
          case EnumCommands.Report:
            returnValue = currentCoordinates;
          break;
          default:
            alert('Invalid Move! Please select from the instructions.');
            break;
        }
    }
    return returnValue;
  }

  private executePlaceCommand(commandInputted: string): CurrentCoordinates {
    let returnValue: CurrentCoordinates = <CurrentCoordinates>{};

    if (commandInputted.startsWith(EnumCommands.Place)) {

      let splittedCommandInput: string[] = commandInputted.split(' ');

      // Validate if place command has 2 string items
      if (splittedCommandInput.length === 2) {
        let placeCommand: EnumCommands.Place = <EnumCommands.Place>splittedCommandInput[0];
        //Check PLACE command if valid
        if (placeCommand === EnumCommands.Place) {
          returnValue = this.validatePlaceCommand(splittedCommandInput);
        }
      }
    }
    return returnValue;
  }


  private validatePlaceCommand(splitCommandCoordinates: string[]): CurrentCoordinates {
    let returnValue: CurrentCoordinates = <CurrentCoordinates>{};
    let faceCoordinates: string[] = splitCommandCoordinates[1].split(',');
    let inputCoordinates: Coordinate = {x: Number(faceCoordinates[0]), y: Number(faceCoordinates[1])};
    let inputDirection: EnumDirections = <EnumDirections>faceCoordinates[2];

    // Check DIRECTION command if valid
    if (this.validDirections.some((vd: EnumDirections)=> vd === inputDirection)){
      
      //Check Coordinates if not on the restricted coordinates
      if (!this.isRestrictedCoordinates(inputCoordinates)) {
        let currentCoordinates: CurrentCoordinates = {coordinates: inputCoordinates, direction: inputDirection};
        returnValue = currentCoordinates;
      }
    }
    return returnValue;
  }

  private isRestrictedCoordinates(inputCoords: Coordinate): boolean {
    // Check the restricted coordinates if same with the user's input.
    return this.restricatedCoordinates.some((restr: Coordinate) => {
      let returnValue:boolean = false;
      if (restr.type === EnumCoordinateType.Restricted) {
        switch(restr.limit) {

          // Coordinate Limits to Above the restricted Table Top
          case EnumCoordinateLimit.Above:
            returnValue = inputCoords.x >= restr.x || inputCoords.y >= restr.y ? true : false;
          break;

          // Coordinate Limits to Below the restricted Table Top 
          case EnumCoordinateLimit.Below:
            returnValue = inputCoords.x <= restr.x || inputCoords.y <= restr.y ? true : false;
          break;
          
          // Coordinate Limits to Equal the restricted Table Top 
          case EnumCoordinateLimit.Equal:
            returnValue = inputCoords.x == restr.x && inputCoords.y == restr.y ? true : false;
          break;

          default:
              returnValue = false;
            break;
        }

      }
      return returnValue;
    })
   
  }

}
