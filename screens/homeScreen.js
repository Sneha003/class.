import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Header, AirbnbRating, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaProvider } from "react-native-safe-area-context";
// fetch api from another website
import axios from "axios";

export default class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state={
      moviedetails:{}
    }
  }
  // num(any number)
  timeconverter(num){
   var hours=Math.floor(num/60)
   var minutes= num%60
  //  console.log(minutes)
  // 2 hrs 20 mins
  return `${hours}hrs ${minutes}mins`
 
  }

  getData=async()=>{
   await axios.get("http://127.0.0.1:5000/get-movies")
   .then((response)=>{
    var details= response.data.data
    console.log(details)
    details["runtime"]=this.timeconverter(details.runtime)
    this.setState({
      moviedetails:details
    })

   })
   .catch((error)=>{
    console.log(error.message)
   })
  }


likedMovies =async()=>{
 await axios.post("http://127.0.0.1:5000/like-movies")
 .then((response)=>{
  this.getData()
 })
 .catch((error)=>{
  console.log(error.message)
 })
}

notLikedMovies =async()=>{
  await axios.post("http://127.0.0.1:5000/unlike-movies")
  .then((response)=>{
   this.getData()
  })
  .catch((error)=>{
   console.log(error.message)
  })
 }

 didnotMatch =async()=>{
  await axios.post("http://127.0.0.1:5000/didnotmatch-movies")
  .then((response)=>{
   this.getData()
  })
  .catch((error)=>{
   console.log(error.message)
  })
 }
  componentDidMount(){
    this.getData()
  }

  render() {
    const {moviedetails}= this.state
    if(moviedetails.posterlink){
      const{
        title,
        posterlink,
        release_date,
        runtime,
        overview,
        rating
      } = moviedetails
      return (
        <SafeAreaProvider>
          <View>
            <View style={styles.headerContainer}>
              <Header
                centerComponent={{
                  text: "Movie Recommendation",
                  style: styles.headerTitle,
                }}
                rightComponent={{
                  icon: "movie",
                  color: "white",
                  type: "material-community",
                }}
                backgroundColor={"orange"}
              />
            </View>
            <View style={styles.subContainer}>
            <View style={styles.subTopContainer}>
                                <Image style={styles.posterImage} source={{ uri: posterlink }} />
                            </View>
             

              <View style={styles.upperBottomContainer}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.subtitle}>{`${release_date.split("-")[0]
                                    } | ${runtime}`}</Text>
                            </View>

            <View style={styles.middleBottomContainer}>
              <View style={{ flex: 0.3 }}>
                <AirbnbRating
                  count={10}
                  reviews={["", "", "", "", ""]}
                  isDisabled={true}
                  defaultRating={rating}
                  starContainerStyle={{ marginTop: 50 }}
                  size={RFValue(25)}
                />
              </View>

              <View style={{ flex: 0.7, padding: 15 }}>
                                    <Text style={styles.overview}>{overview}</Text>
                                </View>
            </View>
            <View style={styles.lowerBottomContainer}>
              <View style={styles.iconButtonContainer}>
                <TouchableOpacity onPress={this.likedMovies}>
                  <Icon
                    name="check"
                    type="entypo"
                    size={RFValue(40)}
                    color="green"
                    reverse
                  ></Icon>
                </TouchableOpacity>
  
  
                <TouchableOpacity onPress={this.notLikedMovies}>
                  <Icon
                    name="cross"
                    type="entypo"
                    size={RFValue(40)}
                    color="red"
                    reverse
                  ></Icon>
                </TouchableOpacity>
              </View>
  
              <View style={styles.buttonCotainer}>
                  <TouchableOpacity style={styles.button}onPress={this.didnotMatch} >
                   <Text style={styles.buttonText}> Did Not Match</Text>   
                  </TouchableOpacity>
             </View>
            </View>
            </View>
          </View>
        </SafeAreaProvider>
      );
    }

      return null
    
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flex: 0.1,
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(18),
  },
  subContainer: {
    flex: 0.9,
  },
  subTopContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  posterImage: {
    width: "60%",
    height: "120%",
    resizeMode: "stretch",
    borderRadius: RFValue(30),
    marginHorizontal: RFValue(10),
    marginTop: 70,
  },
  subBottomContainer: {
    flex: 0.6,
  },
  upperBottomContainer: {
    flex: 0.2,
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: RFValue(35),
  },
  subtitle: {
    fontSize: RFValue(14),
    fontWeight: "300",
  },
  middleBottomContainer: {
    flex: 0.35,
  },
  overview: {
    fontSize: RFValue(13),
    textAlign: "center",
    fontWeight: "300",
    color: "gray",
    marginTop: RFValue(35),
  },
  lowerBottomContainer: {
    flex: 0.45,
    marginTop: RFValue(50),
  },
  iconButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonCotainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: RFValue(160),
    height: RFValue(50),
    borderRadius: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: RFValue(15),
    backgroundColor:"pink"
  },
  buttonText: {
    fontSize: RFValue(15),
    fontWeight: "bold",
  },
});
