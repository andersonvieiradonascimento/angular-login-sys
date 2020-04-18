import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'user-login-success',
    templateUrl: 'user-login-success.component.html'
})
export class DialogUserLoginSuccessComponent implements OnInit{

    constructor( 
        public dialogRef: MatDialogRef<DialogUserLoginSuccessComponent> 
    ) {

    }

    ngOnInit(){

    }

    close(){
        this.dialogRef.close();
    }

}