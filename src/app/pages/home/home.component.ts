import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// services
import { ApiService } from '@/services/api.service';

// interfaces
import { IResult } from '@/interfaces/api.interface';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  private apiService = inject(ApiService);

  public movies: IResult[] = [];

  ngOnInit() {
    this.apiService.getMovies({ language: 'en', category: 'popular' })
      .subscribe((response) => {
        this.movies = response.results;
      });
  }

}
