import { StyleSheet } from "react-native";

export const appTheme = StyleSheet.create({
  globalMarging:{
    marginHorizontal: 10,
    marginTop: 30,
    borderRadius: 10

  },
  globalContainer:{
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecba00"
  },
  title:{
    fontFamily: "arial",
    fontSize: 26, 
    marginBottom: 15  
  },
  input:{
    textDecorationColor:"black",
    borderRadius: 10, 
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    height: 25,
    width: 280,
    margin: 12,
    borderWidth: 5,
    borderColor: "pink"
  }
});