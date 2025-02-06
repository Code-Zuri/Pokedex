import { useState, useRef, useEffect } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginateResponse, Result, PokemonSimple, SimplePokemon } from './../interfaces/pokemonInterfaces';


export const usePokemonPaginated = () => {

  const  [ isLoading, setIsloading ] = useState(true);
  const [ simplePokemonList, setSimplePokemonList ] = useState<SimplePokemon[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")

  const loadPokemons = async () => {
    setIsloading(true);
    const response = await pokemonApi.get<PokemonPaginateResponse>(nextPageUrl);
    setNextPageUrl(response.data.next);
    mapPokemonList(response.data.results);
    
  };


  const mapPokemonList = ( pokemonList: Result[] ) => {
    const newPokemonList : SimplePokemon[] = pokemonList.map( ({ name, url }) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      const types: string[] = []; // Add logic to fetch types if available
      return { id, name, picture, types }
    });
    
    setSimplePokemonList( [ ...simplePokemonList, ...newPokemonList ] );
    
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