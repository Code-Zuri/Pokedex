import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SimplePokemon } from "../interfaces/pokemonInterfaces";
import { UseTypeColorPokemon } from "../hooks/useTypeColorPokemon";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from "../navigator/navigationTypes";

interface Props {
  pokemon: SimplePokemon;
}

const widthWindows = Dimensions.get('window').width;

export const PokemonCard = ( { pokemon }: Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { color, isLoading } = UseTypeColorPokemon( `${pokemon.id}`);  


  
  return (
    <TouchableOpacity
      activeOpacity={ 0.9 }
      onPress={() => navigation.navigate("PokemonScreen", { NewPokemonList: pokemon })}
    >
      <Image
          source={{ uri: pokemon.picture }}
          style={ styles.pokemon }
        />
      <View
        style={{
          ...styles.containerCard1,
          
        }}
      ></View>
      <View
        style={{
          ...styles.containerCard,
          width: widthWindows * 0.4,
        }}
      >

        <View
          style={{ 
          
            backgroundColor: (isLoading) ? 'gray' : (color.length > 1) ? color[1] : color[0],
          }}
        />

        <View
        style={{
          ...styles.backgroundBottom,
          backgroundColor: (isLoading) ? 'gray' : color[0],
        }}  
        />

        <View
          style={{ marginHorizontal:5 }}
        >
            <Text
              style= {styles.name}
            >
              {`\n${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}              
            </Text>
            <Text style= {styles.idbox}/>
             
            <Text style= {styles.uid}>
              { `\n#0${pokemon.id}`}
            </Text>

            <Text style= {styles.detailsbox}>
            </Text>
            <Text
              style= {styles.detail}
            >
              
              { `\nVer Detalles`}
            </Text>
        </View>

       
        

        </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  containerCard1:{
    marginHorizontal: 10, 
    width:120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    top:50,  
    left: 20,
    zIndex:1,
    borderRadius: 1000, 
    
     
  },
  containerCard:{
    marginHorizontal: 10, 
    width: 150,
    height: 200,
    marginBottom:25, 
    borderRadius: 200, 
   
  },
  

  backgroundBottom:{
    position:"absolute",
    top: -10,
    width: 170,
    height:250,
    left: -5,
    right: 0,
    bottom: 0,
    borderRadius:15,
    
  
  }, 
  pokeball:{
    
    width: 120,
    position: "absolute", //Mantener fijo
    bottom: -20, 
    right: -20,
    opacity: 0.5,
  },
  pokemon: {
    height:120, 
    width: 120, 
    top:"15%",
    position: "absolute",
    left:"15%",
    bottom: -5,
    zIndex:2,
  },
  name:{
    color:" 'rgba(70, 67, 67, 0.74)'",
    fontSize: 25,
    top: '30%',
    textAlign: "center",
    fontWeight: "bold",
  },
  idbox:{
    width:70,
    height: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.53)',
    borderRadius: 20,
    top: '0%',
    left:40
  },
  uid:{
    color:"#414040",
    fontSize: 14,
    top: '-20%',
    left:57
  },
  detailsbox:{
    width:100,
    height: 30,
    backgroundColor: 'rgba(212, 141, 100, 0.82)',
    borderRadius: 10,
    top: "33%",
    left:25
  },
  detail:{
    color:"white",
    fontSize: 15,
    top: "10%",
    left:35,
    fontWeight: "bold",
  },
})

