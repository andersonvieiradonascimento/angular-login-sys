import { Component, OnInit, Input } from '@angular/core';
import { UsersharedService } from '../../../../services/requests/usershared.service';

@Component({
  selector: 'dev-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor( private sharedService: UsersharedService ) { }

  @Input() userSystem: any;

  ngOnInit(): void {
    
  }

}
