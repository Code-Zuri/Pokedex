import React from "react";
import { View, Text, Image, ActivityIndicator, FlatList } from 'react-native';
import { usePokemonPaginated } from "../../hooks/usePokemonPaginated";
import { PokemonCard } from "../../components/PokemonCard";
import { appTheme } from "../../themes/appTheme";


//screen para renderizar datos
export const PokemonHomeScreen = () => {

  const { simplePokemonList, loadPokemons } = usePokemonPaginated();

  //const pokemon = { ...simplePokemonList[0] }
  //console.log(simplePokemonList);
  
  return (
    <View
      style= {{
        ...appTheme.globalContainer,
        ...appTheme.globalMarging
      }}
    >

{/*       
      <Text
        style = {{ fontSize: 30 }}
      >
        { JSON.stringify( simplePokemonList ) }
      </Text> */}

      <FlatList
        data={ simplePokemonList } //enviar data
        keyExtractor={ (pokemon, index) => `${pokemon.id}${index}` } //iteración 

        //header
        ListHeaderComponent={(
          
          <Text
          style={{
            ...appTheme.title,
            ...appTheme.globalMarging,
            marginTop: 20, 
            fontWeight: "bold",
            fontSize: 40,
            textAlign: "center"
          }}
          >Pokedex
            
          </Text>
        )}

        //body
          showsVerticalScrollIndicator={false}
          numColumns={2} //si hay cambio, reiniciar app
          renderItem={ ({item}) => (
            <PokemonCard
              pokemon={item}
            />
          )}

        //infinite Scroll
        onEndReached={ loadPokemons } //cuando se llegue al final de la pantalla, llama a la función loadPokemons
        onEndReachedThreshold={ 0.2 } //A cierto porcentaje de pantalla, luego carga pantalla 

        //footer
        ListFooterComponent={(
            <ActivityIndicator
              style= {{ height: 120 }}
              size={ 50 }
              color={ "pink" }
            />
          ) 
        }

      />
    </View>
  );
}
