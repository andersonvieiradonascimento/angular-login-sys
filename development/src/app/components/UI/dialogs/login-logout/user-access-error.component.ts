import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'user-access-error-dialog',
    templateUrl: 'user-access-error.component.html'
})
export class DialogUserAccessErrorComponent implements OnInit{

    constructor(
        public dialogRef: MatDialogRef<DialogUserAccessErrorComponent>
    ){
        
    }

    ngOnInit(){
    }

    close(){
        this.dialogRef.close();
    }

}