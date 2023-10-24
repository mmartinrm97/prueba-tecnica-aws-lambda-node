import "reflect-metadata"
import { Container } from "inversify"
import { FilmService } from "src/films/services/film.services";
import { FilmsRepository } from "src/films/entity/film.repository";

const container = new Container()
container.bind<FilmService>(FilmService).to(FilmService);
container.bind<FilmsRepository>('FILM_REPO').to(FilmsRepository)

export {container}