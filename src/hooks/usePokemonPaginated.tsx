import { useState, useRef, useEffect } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { SimplePokemon, PokemonPaginateResponse, Result } from './../interfaces/pokemonInterfaces';

//Hook para consumir la api de pokemon
//useRef usado como paginación
//useState para el estado de la lista de pokemons

export const usePokemonPaginated = () => {

  const  [ isLoading, setIsloading ] = useState<boolean>(false);
  
  const [ simplePokemonList, setSimplePokemonList ] = useState<SimplePokemon[]>([]);

  //Almacenar la url de la siguiente página
  const nextPageUrl = useRef("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")

  //Función asincrona para cargar los siguientes pokemons
  const loadPokemons = async () => {
    
    setIsloading(true);

    const response = await pokemonApi.get<PokemonPaginateResponse>(nextPageUrl.current);

    nextPageUrl.current = response.data.next;

    mapPokemonList(response.data.results);
    
  }

  //Reestucturación de datos de la api
  const mapPokemonList = async ( PokemonList: Result[] ) => {
    const newPokemonList : SimplePokemon[] = await Promise.all(PokemonList.map( async ({ name, url }) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`;

      const typesResponse = await pokemonApi.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const types = typesResponse.data.types.map((typeInfo: any) => typeInfo.type.name).join(', ');

      return { id, name, picture, types }
    }));
    
    setSimplePokemonList( ( prevList ) => [ ...prevList, ...newPokemonList ] );
    
    setIsloading(false);
  }

  useEffect( () => {
    loadPokemons();
  },[]);

  return {
    isLoading,
    simplePokemonList,
    loadPokemons
  }
}