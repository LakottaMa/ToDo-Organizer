import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-newtodo',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, TextFieldModule],
  templateUrl: './newtodo.component.html',
  styleUrl: './newtodo.component.scss',
})
export class NewtodoComponent {
}
