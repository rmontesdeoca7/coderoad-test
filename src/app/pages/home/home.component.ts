import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// services
import { ApiService } from '@/services/api.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private apiService = inject(ApiService);

  ngOnInit() {
    this.apiService.getMovies({ language: 'en', category: 'popular' })
      .subscribe((response) => {
        console.log(response);
      });
  }

}
