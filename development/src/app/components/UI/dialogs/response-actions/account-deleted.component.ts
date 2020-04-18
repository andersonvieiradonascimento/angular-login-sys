import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'account-deleted'
    , templateUrl: './account-deleted.component.html'
})

export class AccountDeletedComponent implements OnInit{

    constructor(
        public dialogRef: MatDialogRef<AccountDeletedComponent>
    ) {}

    ngOnInit(){

    }

    close(){
        this.dialogRef.close();
    }

}