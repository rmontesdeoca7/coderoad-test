import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

@Component({
  templateUrl: './movie-detail.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  standalone: true,
})
export class MovieDetailsComponent {
  data = inject(MAT_DIALOG_DATA);
}
