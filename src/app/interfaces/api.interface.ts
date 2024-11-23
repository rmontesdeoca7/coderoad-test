export type Category = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

export interface IQuery {
  language: string;
  category: Category;
}
