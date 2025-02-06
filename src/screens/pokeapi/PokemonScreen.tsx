import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
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

  const getStatBarWidth = (value: number) => {
    return `${(value / 100) * 100}%`;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { backgroundColor: isLoading ? 'gray' : color[0] }]}> 
        {/* Botón de retroceso */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={[styles.backText, {fontSize:50}]}>{"❮"}</Text>
        </TouchableOpacity>
        
        {/* Nombre y Tipo */}
        <Text style={styles.pokemonId}> { `\n#0${pokemon?.id}`}</Text>
        <Text style={styles.pokemonName}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
        <View style={styles.typeContainer}>
          {pokemon?.types?.map((typeInfo, index) => (
            <View key={index} style={styles.typeBox}>
              <Text style={styles.typeText}>
                {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
              </Text>
            </View>
          ))}
        </View>
        
        {/* Imagen del Pokémon */}
        <View style={styles.bgcontainer}/>
        <Image source={pokebola} style={styles.pokebola} />
        <Image source={{ uri: picture }} style={styles.pokemonImage} />
        
        {/* Datos del Pokémon */}
        <View style={styles.infoContainer}>
          <View style={styles.column}>
            <Text style={styles.infoText}>Experiencia:</Text>
            <Text style={styles.infoText}>Height: </Text>
            <Text style={styles.infoText}>Weight: </Text>
            <Text style={styles.infoTextVal}> {pokemon?.base_experience || "-"}</Text>
            <Text style={styles.infoTextVal}>{pokemon?.height || "-"}</Text>
            <Text style={styles.infoTextVal}>{pokemon?.weight || "-"}</Text>
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
        
        {/* Barra de estadísticas */}
        <View style={styles.statContainer}>
          <Text style={styles.infoHText}>HP: {pokemon?.stats?.find(stat => stat.stat.name === 'hp')?.base_stat || "-"}</Text>
          <View style={styles.statBar}>
            <View style={[styles.statBarFill, { width: parseFloat(getStatBarWidth(pokemon?.stats?.find(stat => stat.stat.name === 'hp')?.base_stat || 0)) }]} />
          </View>
          <Text style={styles.infoHText}>Ataque: {pokemon?.stats?.find(stat => stat.stat.name === 'attack')?.base_stat || "-"}</Text>
          <View style={styles.statBar}>
            <View style={[styles.statBarFill, { width: parseFloat(getStatBarWidth(pokemon?.stats?.find(stat => stat.stat.name === 'attack')?.base_stat || 0)) }]} />
          </View>
          <Text style={styles.infoHText}>Defensa: {pokemon?.stats?.find(stat => stat.stat.name === 'defense')?.base_stat || "-"}</Text>
          <View style={styles.statBar}>
            <View style={[styles.statBarFill, { width: parseFloat(getStatBarWidth(pokemon?.stats?.find(stat => stat.stat.name === 'defense')?.base_stat || 0)) }]} />
          </View>
        </View>
        
        {/* Carga de detalles */}
        {isLoadingPokemon && <ActivityIndicator color="white" size={50} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backBtn: {
    position: 'absolute',
    top: "0%",
    left: 20,
    
  },
  backText: {
    fontSize: 30,
    color: 'white',
  },
  pokemonId: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    top:"-4%",
    right: "-10%",
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    top:"-10%",
    right: "20%",
    zIndex: 1,
  },
  typeContainer: {
    flexDirection: 'row', // Organizar en filas
    justifyContent: 'space-around', // Espaciar los tipos
    marginTop: 10,
    top: "33%",
    right: "0%",
    zIndex: 1,
  },
  typeBox: {
    backgroundColor: 'rgb(156, 156, 156)',
    padding: 5,
    borderColor: 'rgb(156, 156, 156)',
    borderWidth: 1,
    height: 30,
    width: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  typeText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    top: "-15%",
  },
  pokebola: {
    tintColor: 'rgb(226, 230, 182)',
    width: 300,
    height: 300,
    position: 'absolute',
    bottom: -20,
    left: "15%",
    opacity: 0.5,
    top:"10%",
    transform: [{ rotate: '-20deg' }],
    zIndex: 1,
  },
  pokemonImage: {
    width: 300,
    height: 300,
    marginVertical: 20,
    top:"-5%",
    left: "0%",
    zIndex: 2,
  },
  bgcontainer: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 15,
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
    width: 700,
    height: 2000,
    top: "35%",
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 0,
  },
  infoContainer: {
    padding: 15,
    borderRadius: 15,
    width: '100%',
    height: 200,
    flexDirection: 'row',
    top: "0%",
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'flex-start',
  },
  infoText: {
    color: 'gray',
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  infoTextVal: {
    color: 'black',
    fontSize: 20,
    marginBottom: 5,
    top: "-55%",
    left: "70%",
  },
  statContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  infoHText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
    top: "-30%",
  },
  statBar: {
    width: '100%',
    height: 20, // Aumentar la altura de la barra
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15, // Aumentar el margen inferior
    top: "-30%",
  },
  statBarFill: {
    height: '100%',
    backgroundColor: '#ff5733',
  },
});

export default PokemonScreen;