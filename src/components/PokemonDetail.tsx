import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { PokemonSimple } from "../interfaces/pokemonInterfaces";
import { UseTypeColorPokemon } from "../hooks/useTypeColorPokemon";
import { appTheme } from "../themes/appTheme";

interface Props{
  pokemon: PokemonSimple;
}

export const PokemonDetail = ( {pokemon}:Props) => {

  const { color, isLoading } = UseTypeColorPokemon( `${pokemon.id}` );

  return (
    <ScrollView
      style={{
        ...StyleSheet.absoluteFillObject
      }}
    >
      <View>
        <Text
          style={{
            ...appTheme.title,
            color: "white",
            marginTop: 370,
            marginHorizontal: 20,
          }}
        >
          Types
        </Text>
        <View
          style={{ flexDirection: "row" }}
        >
          {
            pokemon.types.map( ({ type }) => (
              <Text
                key={ type.name }
                style={{
                  fontSize: 20,
                  marginRight: 10,
                  marginHorizontal: 20,
                  backgroundColor: (isLoading) ? "gray" : color[0],
                  borderRadius: 5
                }}
              >
                { type.name}
              </Text>
            ))
          }
        </View>
        {/*Peso*/}
        <View>
          <Text
            style={{
              ...appTheme.title,
              marginHorizontal: 20,
            }}
          >
            Weight
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginHorizontal: 20,
            }}
          >
            { pokemon.weight + "lb" }
          </Text>
        </View>
        {/* Sprites */}
        <View>
          <Text
            style={{
              ...appTheme.title,
              marginHorizontal: 20,
            }}
          >
            Sprites
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <Image
              style={{
                  height:100,
                  width:100,
              }}
              source={{
                uri: pokemon.sprites.front_default
              }}
            />
            <Image
              style={{
                  height:100,
                  width:100,
              }}
              source={{
                uri: pokemon.sprites.back_default
              }}
            />
            <Image
              style={{
                  height:100,
                  width:100,
              }}
              source={{
                uri: pokemon.sprites.front_shiny
              }}
            />
            <Image
              style={{
                  height:100,
                  width:100,
              }}
              source={{
                uri: pokemon.sprites.back_shiny
              }}
            />
            <Image
              style={{
                  height:100,
                  width:100,
              }}
              source={{
                uri: pokemon.sprites.back_shiny
              }}
            />
            <Image
              style={{
                  height:100,
                  width:100,
              }}
              source={{
                uri: pokemon.sprites.back_shiny
              }}
            />
            {
              (pokemon.sprites.front_female) && (
                <Image
                style={{
                    height:100,
                    width:100,
                }}
                source={{
                  uri: pokemon.sprites.front_female
                }}
              />
              )
            }
                        {
              (pokemon.sprites.back_female) && (
                <Image
                style={{
                    height:100,
                    width:100,
                }}
                source={{
                  uri: pokemon.sprites.back_female
                }}
              />
              )
            }
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}