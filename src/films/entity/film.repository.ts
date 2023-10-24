import { injectable } from 'inversify';
import { FilmStarWars } from 'src/interfaces/star-wars';

@injectable()
export class FilmsRepository {
    private films: FilmStarWars[] = [];

    public findById(id: string): FilmStarWars | undefined {
        return this.films.find((film) => film.id === id);
    }

    public create(film: FilmStarWars): void {
        this.films.push(film);
    }
}