import { inject, injectable } from 'inversify';
import { FilmsRepository } from '../entity/film.repository';
import { FilmStarWars } from 'src/interfaces/star-wars';


@injectable()
export class FilmService {
    constructor(
        @inject('FILM_REPO')
        private readonly filmRepository: FilmsRepository) { }

    public findById(id: string): FilmStarWars | undefined {
        return this.filmRepository.findById(id);
    }

    public createFilm(film: FilmStarWars): void {
        this.filmRepository.create(film);
    }
}