import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'user-registered-dialog',
    templateUrl: 'user-registered.component.html'
})
export class DialogUserRegisteredComponent implements OnInit{

    data: Boolean;

    constructor(
        public dialogRef: MatDialogRef<DialogUserRegisteredComponent>
        , @Inject(MAT_DIALOG_DATA) data
    ){
        this.data = data;
    }

    ngOnInit(){
    }

    close(){
        this.dialogRef.close();
    }

}