import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructionsComponent } from './robot/instructions/instructions.component';
import { RobotComponent } from './robot/robot.component';
import { SharedModule } from '../shared/shared.module';
import { MovesHistoryComponent } from './robot/moves-history/moves-history.component';
import { CommandInputComponent } from './robot/command-input/command-input.component';

@NgModule({
  declarations: [
    RobotComponent,
    InstructionsComponent,
    CommandInputComponent,
    MovesHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: []
})
export class PagesModule { }
