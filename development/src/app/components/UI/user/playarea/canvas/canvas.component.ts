import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dev-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor() { }

  @Input() userSystem: any;

  ngOnInit(): void {
  }

}
