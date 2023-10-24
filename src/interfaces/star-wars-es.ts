export interface PeopleStarWarsES {
    id: string;
    nombre: string;
    altura: string;
    masa: string;
    color_cabello: string;
    color_piel: string;
    color_ojos: string;
    año_nacimiento: string;
    género: string;
    planeta_origen: string;
    películas: string[];
    especies: string[];
    vehículos: string[];
    naves_estelares: string[];
    creado: Date;
    editado: Date;
    url: string;
}

export interface FilmStarWarsES {
    id: string;
    titulo: string;
    episodio_id: number;
    apertura: string;
    director: string;
    productor: string;
    fecha_estreno: string;
    personajes: string[];
    planetas: string[];
    naves_estelares: string[];
    vehículos: string[];
    especies: string[];
    creado: Date;
    editado: Date;
    url: string;
}

export interface PlanetStarWarsES {
    id: string;
    nombre: string;
    período_rotación: string;
    período_orbital: string;
    diámetro: string;
    clima: string;
    gravedad: string;
    terreno: string;
    agua_superficie: string;
    población: string;
    residentes: string[];
    películas: string[];
    creado: Date;
    editado: Date;
    url: string;
}

export interface SpecieStarWarsES {
    id: string;
    nombre: string;
    clasificación: string;
    designación: string;
    altura_promedio: string;
    colores_piel: string;
    colores_cabello: string;
    colores_ojos: string;
    esperanza_vida_promedio: string;
    planeta_origen: string;
    idioma: string;
    personas: string[];
    películas: string[];
    creado: Date;
    editado: Date;
    url: string;
}

export interface StarshipStarWarsES {
    id: string;
    nombre: string;
    modelo: string;
    fabricante: string;
    costo_en_créditos: string;
    longitud: string;
    velocidad_máx_atmosférica: string;
    tripulación: string;
    pasajeros: string;
    capacidad_carga: string;
    consumibles: string;
    calificación_hiperimpulsor: string;
    MGLT: string;
    clase_nave_estelar: string;
    pilotos: string[];
    películas: string[];
    creado: Date;
    editado: Date;
    url: string;
}

export interface VehicleStarWarsES {
    id: string;
    nombre: string;
    modelo: string;
    fabricante: string;
    costo_en_créditos: string;
    longitud: string;
    velocidad_máx_atmosférica: string;
    tripulación: string;
    pasajeros: string;
    capacidad_carga: string;
    consumibles: string;
    clase_vehículo: string;
    pilotos: string[];
    películas: string[];
    creado: Date;
    editado: Date;
    url: string;
}
