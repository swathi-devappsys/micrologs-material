import { Component } from '@angular/core';
import {BarchartComponent} from '../../../utils/components/barchart/barchart.component';
import {PiechartComponent} from '../../../utils/components/piechart/piechart.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {DatacardComponent} from '../../../utils/components/datacard/datacard.component';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {FlexModule} from '@angular/flex-layout';


@Component({
  selector: 'app-home',
  imports: [
    BarchartComponent,
    PiechartComponent,
    MatCard,
    DatacardComponent,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    FlexModule,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
