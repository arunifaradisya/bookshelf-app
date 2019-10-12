import React, { createElement, Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, Easing, TextInput, Image } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

import booksJSON from './books.json';
import Book from './Book';

// const MyComponent = () => (
//   <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
// );

export default class App extends React.Component {
  
  state = { books: [] }

  animation = new Animated.Value (0);
  animationSpring = new Animated.Value(0);

  componentDidMount() {
    this.setState({ books: booksJSON });

    Animated.timing(this.animation, {
      duration: 1500,
      toValue: 1
    }).start();

    Animated.spring(this.animationSpring, {
      toValue: 10,
      speed: 10,
      bounciness: 25
    }).start();

  }

Book =(item)=>{}

  render(){
    const bookIdentity = 'Book' ;

    return (
      <View contentContainerStyle={styles.container}>

        <View style={styles.header} i >
          <Text style={styles.logo}>BookShelf</Text>
        </View>

        <ScrollView style={styles.allContainer}>
          <View style={styles.topContainer}>

            <ConfettiCannon count={200} origin={{x: 0, y: 0}} />

                <Animated.View style={{
                    ...styles.box2,
                    transform: [{
                      rotate: this.animation.interpolate({
                        // whatever the value is zero that is what the input range is
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg']
                      }),
                    },
                    { 
                      translateX: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0]
                      })
                    }
                  ],
                    opacity: this.animation
                  }}><Image style={styles.mainimage} source={require('./assets/books.png')}/>
                </Animated.View>
                <Animated.Text style={{...styles.quote, 
                          transform: [{
                            translateY: this.animation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [-10, -152]
                            })
                          }]
                        }}><Text style={styles.quote}>"A room without books is like a body without a soul." -Marcus Tullius Cicero.</Text>
                </Animated.Text>


          </View>    

          
          <Animated.View style={{...styles.subHeading, 
            transform: [{
              translateX: this.animationSpring.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 4]
              })
            }]
            }}>
              <Text style={{width: '100%', fontFamily: 'Avenir', fontSize: 24, marginTop: '5%', fontWeight: "900", color: '#626954'}}>Find what you're looking for!</Text>
          </Animated.View>

          

          <ScrollView style={styles.hero}>
            {/* Search bar */}
            <View style={styles.topSearchContainer}>
                <TextInput style={{flex: 1, marginLeft: 5, marginRight: 10, color : "#3842B0"}} placeholder={'Search'} placeholderTextColor='#3842B0' fontFamily='Avenir'/>
            </View>
          
            {

              this.state.books.map( (theBook, index) =>
                <Book key={index} image={theBook.image} title={theBook.title} author={theBook.author} year={theBook.year}></Book>
              )

            }
            
            <View style={styles.footer}>
              <Text style={styles.copyright}>Design © Aruni Faradisya 2019</Text> 
            </View>

        </ScrollView>
        </ScrollView>


      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#FFFFFF',
    margin: 10,
    marginBottom: '100%',
  },
  copyright: {
    color: '#000000',
    fontSize: 16,
    fontWeight: "100",
    fontFamily: 'Avenir',
    textAlign: 'center',
    margin: "5%"
  },
  footer: {
    justifyContent: 'center'
  },
  header: {
    backgroundColor: '#AFB5A3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    width: '100%',
    textAlign: 'center',
    padding: '10%'
  },
  logo: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 60,
    paddingBottom: 20,
    fontFamily: 'Avenir'
  },
  quote: {
    width: '50%',
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 18,
    left: '50%',
    height: 200
  },
  topSearchContainer: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#AFB5A3"
  },
  topContainer: {
    backgroundColor: '#626954',
    width: '100%',
    padding: '10%',
    paddingBottom: 0,
    height: 240
  },
  topImageContainer: {
    width: "50%",
    left: "25%",
    textAlign: 'center'
  },
  mainimage: {
    width: 150,
    height: 150,
    marginBottom: 20
  },
  subHeading: {
    fontFamily: 'Avenir',
    fontSize: 20
  }
});

