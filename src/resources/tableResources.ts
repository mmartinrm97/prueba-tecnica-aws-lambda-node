import { FilmsTable } from '../dynamodb/offline/migrations/films';
import { SpeciesTable } from '../dynamodb/offline/migrations/species';
import { PeopleTable } from '../dynamodb/offline/migrations/people';
import { PlanetsTable } from '../dynamodb/offline/migrations/planets';
import { StarshipsTable } from '../dynamodb/offline/migrations/starships';
import { VehiclesTable } from '../dynamodb/offline/migrations/vehicles';

export const tableResources = {
    Resources: {
        FilmsTable,
        SpeciesTable,
        PeopleTable,
        PlanetsTable,
        StarshipsTable,
        VehiclesTable
    },
}

// {
//     AttributeName: 'name',
//     AttributeType: 'S',
// },
// {
//     AttributeName: 'height',
//     AttributeType: 'S',
// },
// {
//     AttributeName: 'mass',
//     AttributeType: 'S',
// },
// {
//     AttributeName: 'hair_color',
//     AttributeType: 'S',
// },
// {
//     AttributeName: 'skin_color',
//     AttributeType: 'S',
// },
// {
//     AttributeName: 'eye_color',
//     AttributeType: 'S',
// },
// {
//     AttributeName: 'birth_year',
//     AttributeType: 'S',
// },
// {
//     AttributeName: 'gender',
//     AttributeType: 'S',
// },
// {
//     AttributeName: 'homeworld',
//     AttributeType: 'S',
// },
// {
//     AttributeName: 'films',
//     AttributeType: 'SS', // Tipo de atributo: conjunto de cadenas (strings)
// },
// {
//     AttributeName: 'species',
//     AttributeType: 'SS',
// },
// {
//     AttributeName: 'vehicles',
//     AttributeType: 'SS',
// },
// {
//     AttributeName: 'starships',
//     AttributeType: 'SS',
// },
// {
//     AttributeName: 'created',
//     AttributeType: 'S',
// },
// {
//     AttributeName: 'edited',
//     AttributeType: 'S',
// },
// {
//     AttributeName: 'url',
//     AttributeType: 'S',
// },