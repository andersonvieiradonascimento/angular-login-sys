import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'user-info-exists',
    templateUrl: 'user-info-exists.component.html'
})
export class DialogUserInfoExistsComponent implements OnInit{

    data: string;

    constructor(
        public dialogRef: MatDialogRef<DialogUserInfoExistsComponent>
        , @Inject(MAT_DIALOG_DATA) data
    ) {
        this.data  = data;
    }

    ngOnInit(){

    }

    close(){
        this.dialogRef.close();
    }

}