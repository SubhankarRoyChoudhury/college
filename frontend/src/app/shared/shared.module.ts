import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToasterComponent } from './toaster/toaster.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogCommonHeaderComponent } from './dialog-common-header/dialog-common-header.component';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    DialogCommonHeaderComponent,
    DialogConfirmationComponent,
    ToasterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    DragDropModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  exports: [DialogCommonHeaderComponent, HeaderComponent],
})
export class SharedModule {}
