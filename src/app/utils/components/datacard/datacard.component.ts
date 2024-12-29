import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-datacard',
  imports: [],
  templateUrl: './datacard.component.html',
  styleUrl: './datacard.component.css'
})
export class DatacardComponent {
  @Input() title: string = 'Title';
  @Input() content: string = 'Default here';
}
