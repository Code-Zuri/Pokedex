import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackPokemonParams } from "../../navigator/PokemonNavigator";
import { UseTypeColorPokemon } from "../../hooks/useTypeColorPokemon";
import { usePokemon } from "../../hooks/usePokemon";
import pokebola from "../../../assets/pokebola.png";

interface Props extends StackScreenProps<RootStackPokemonParams, "PokemonScreen"> {}

export const PokemonScreen = ({ navigation, route }: Props) => {
  const { NewPokemonList } = route.params;
  
  const { id, name, picture } = NewPokemonList;
  const { color, isLoading } = UseTypeColorPokemon(`${id}`);
  const { pokemon, isLoadingPokemon } = usePokemon(`${id}`);

  return (
    <View style={[styles.container, { backgroundColor: isLoading ? 'gray' : color[0] }]}> 
      {/* Botón de retroceso */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={[styles.backText, {fontSize:50}]}>{"←"}</Text>
      </TouchableOpacity>
      
      {/* Nombre y Tipo */}
      <Text style={styles.pokemonId}> { `\n#0${pokemon.id}`}</Text>
      <Text style={styles.pokemonName}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
      <View style={styles.typeContainer}>
        <Text style={styles.typeText}>{pokemon?.types?.[0]?.type?.name.charAt(0).toUpperCase() + pokemon?.types?.[0]?.type?.name.slice(1) || 'Unknown'}</Text>
      </View>
      
      {/* Imagen del Pokémon */}
      <Image source={pokebola} style={styles.pokebola} />
      <Image source={{ uri: picture }} style={styles.pokemonImage} />
      
      {/* Datos del Pokémon */}
      <View style={styles.infoContainer}>
        <View style={styles.column}>
          <Text style={styles.infoText}>Experiencia: {pokemon?.base_experience || "-"}</Text>
          <Text style={styles.infoText}>Height: {pokemon?.height || "-"}</Text>
          <Text style={styles.infoText}>Weight: {pokemon?.weight || "-"}</Text>
         
        </View>
        <View style={styles.column}>
        <Text style={styles.infoText}>Abilities:</Text>
        
          {pokemon?.abilities?.map((ability, index) => (
            <Text key={index} style={styles.infoText}>
              {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
            </Text>
          ))}
        </View>
      </View>
      
      {/* Carga de detalles */}
      {isLoadingPokemon && <ActivityIndicator color="white" size={50} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backBtn: {
    position: 'absolute',
    top: "3%",
    left: 20,
  },
  backText: {
    fontSize: 30,
    color: 'white',
  },
  pokemonId: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
    top:"3%",
    right: "40%",
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    top:"2%",
    right: "28%",
    zIndex: 1,
  },
  typeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 5,
    borderColor: 'white',
    borderWidth: 1,
    height: 30,
    width: 90,
    top:"3%",
    right: "35%",
    borderRadius: 50,
    zIndex: 1,
    marginTop: 10,
  },
  typeText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    top:"-20%",
  },
  pokebola: {
    tintColor: 'white',
    width: 450,
    height: 450,
    position: 'absolute',
    bottom: -20,
    left: 200,
    opacity: 0.5,
    top:"-25%",
    transform: [{ rotate: '-20deg' }],
  },
  pokemonImage: {
    width: 300,
    height: 300,
    marginVertical: 20,
    top:"-25%",
    left: "15%",
  },
  infoContainer: {
    backgroundColor: 'rgba(68, 67, 67, 0.2)',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    height: 200,
    flexDirection: 'row',
    top: "-20%", // Añadir esta línea para organizar en filas
    justifyContent: 'space-between', // Añadir esta línea para espaciar las columnas
  },
  column: {
    flex: 1, // Añadir esta línea para que cada columna ocupe el mismo espacio
    alignItems: 'flex-start', // Alinear el contenido de la columna a la izquierda
  },
  infoText: {
    color: 'white',
    fontSize: 25,
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

export default PokemonScreen;