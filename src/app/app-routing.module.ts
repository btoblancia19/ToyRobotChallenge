import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RobotComponent } from './pages/robot/robot.component';

const routes: Routes = [
  {
    path: "",
    component: RobotComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
