import { useState, useEffect } from "react";
import { PokemonSimple } from "../interfaces/pokemonInterfaces";
import { pokemonApi } from "../api/pokemonApi";

interface UsePokemon{
  isLoadingPokemon: boolean;
  pokemon: PokemonSimple;
}

export const usePokemon = ( id:number|string): UsePokemon => {

  const [isLoadingPokemon, setIsLoadingPokemon ] = useState<boolean>(true);
  const [pokemon, setPokemon ] = useState<PokemonSimple>({} as PokemonSimple);

  const loadPokemon = async() => {
    setIsLoadingPokemon(true);
    const response = await pokemonApi.get<PokemonSimple>(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon( response.data );
    setIsLoadingPokemon(false);
  }

  useEffect(()=>{
    loadPokemon();
  },[]);

  return { isLoadingPokemon, pokemon }
}