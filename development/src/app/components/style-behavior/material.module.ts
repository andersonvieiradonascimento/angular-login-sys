import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatPasswordStrengthModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatPasswordStrengthModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule]
})
export class MaterialModule{}
