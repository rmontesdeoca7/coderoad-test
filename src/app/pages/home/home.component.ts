import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { MaterialModule } from '@/modules/material.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// services
import { ApiService } from '@/services/api.service';

// interfaces
import { IQuery, IResult } from '@/interfaces/api.interface';

// modals
import { MovieDetailsComponent } from '../modals/movie-detail.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  // injects
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);

  public movies: IResult[] = [];
  public pages:number = 1;
  public categories = [
    {
      value: 'popular',
      label: 'Popular',
    },
    {
      value: 'top_rated',
      label: 'Top Rated',
    },
    {
      value: 'upcoming',
      label: 'Upcoming',
    },
    {
      value: 'now_playing',
      label: 'Now Playing',
    }
  ];
  public languages = [
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'es',
      label: 'Spanish',
    }
  ];
  public rules = [
    {
      value: 'odd',
      label: 'Odd / Even',
    },
    {
      value: 'fibonacci',
      label: 'Fibonacci',
    },
    {
      value: 'prime',
      label: 'Prime numbers',
    }
  ]
  public form = this.fb.nonNullable.group({
    category: ['popular'],
    language: ['en'],
    rules:    [''],
  });

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    const value = this.form.value as IQuery;
    const query: IQuery = {
      language: value.language || '',
      category: value.category || 'popular',
      page: this.pages,
    };

    this.apiService.getMovies(query)
    .subscribe((response) => {
      this.movies = [
        ...this.movies,
        ...response.results
      ];
      this.pages++;
    });
  }

  onChangeRules() {
    const type = this.form.controls['rules'].value;
    const limit = this.movies.length;
    this.movies.map(item => item.hasColor = false);

    switch (type) {
      case 'odd':
        const oddSet = this.odd(limit);
        oddSet.forEach((item, index) => {
          this.movies[index].hasColor = true;
        });
        break;
      case 'fibonacci':
        const fibSet = this.fibonacci(limit);
        fibSet.forEach((item, index) => {
          this.movies[index].hasColor = true;
        });
        break;
      case 'prime':
        const primeSet = this.prime(limit);
        primeSet.forEach((item, index) => {
          this.movies[index].hasColor = true;
        });
        break;
      default:
        break;
    }

  }

  // methods
  prime(limit: number) {
    if (limit < 2) return [];

    const sieve = Array(limit + 1).fill(true);
    sieve[0] = sieve[1] = false;

    for (let i = 2; i <= Math.sqrt(limit); i++) {
      if (sieve[i]) {
        for (let j = i * i; j <= limit; j += i) {
          sieve[j] = false;
        }
      }
    }
    return sieve.map((isPrime, index) => (isPrime ? index : -1)).filter((n) => n !== -1);
  }

  fibonacci(limit: number): Set<number> {
    const fibSet = new Set<number>();
    let a = 0, b = 1;
    while (a <= limit) {
      fibSet.add(a);
      [a, b] = [b, a + b];
    }
    return fibSet;
  }

  odd(limit: number): Set<number> {
    const oddSet = new Set<number>();
    for (let i = 1; i <= limit; i++) {
      if (i % 2 === 1) {
        oddSet.add(i);
      }
    }
    return oddSet;
  }

  private i = 0;
  private colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#8B00FF']
  getColor(): string {
    let color = this.colors[this.i];
    this.i++;
    if (this.i >= this.colors.length) {
      this.i = 0;
    }
    return color;
  }


  getMovieDetails(item: IResult) {
    const dialog = this.dialog.open(MovieDetailsComponent, {
      data: this.movies[0],
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight
    ) {
      this.getMovies();
    }
  }


}
