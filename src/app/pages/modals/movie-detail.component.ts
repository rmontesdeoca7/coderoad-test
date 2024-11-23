import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  templateUrl: './movie-detail.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  standalone: true,
  selector: 'app-modal',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailsComponent {
  @Input() title: string = '';
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
