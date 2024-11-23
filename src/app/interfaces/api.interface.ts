export type Category = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

export interface IQuery {
  language: string;
  category: Category;
  page?: number;
}


export interface IResponse {
  page:          number;
  results:       IResult[];
  total_pages:   number;
  total_results: number;
}

export interface IResult {
  adult:             boolean;
  backdrop_path:     string;
  genre_ids:         number[];
  id:                number;
  original_language: string;
  original_title:    string;
  overview:          string;
  popularity:        number;
  poster_path:       string;
  release_date:      Date;
  title:             string;
  video:             boolean;
  vote_average:      number;
  vote_count:        number;
  hasColor?:         boolean;
}
