// Home.js

import React, { useState, Suspense } from 'react';
import { ImageBackground, StyleSheet, View, Text, Button, TouchableOpacity, Dimensions } from 'react-native';

import engBg from './images/eng_bg_3.jpg'

// These are the lazy-loaded components that will be used to render the quizzes for each subject.
// Using code splitting with re.pack, the components will only be loaded when needed, improving the app's performance.
const DataStructuresQuiz = React.lazy(
  () => import(/* webpackChunkName: "datastructuresquiz" */ './DataStructuresQuiz.js')
);
const MicroprocessorQuiz = React.lazy(
  () => import(/* webpackChunkName: "microprocessorquiz" */ './MicroprocessorQuiz.js')
);
const JavaProgrammingQuiz = React.lazy(
  () => import(/* webpackChunkName: "javaprogrammingquiz" */ './JavaProgrammingQuiz.js')
);

// This is the Home component that displays the subject buttons and renders the appropriate quiz component when a button is pressed.
// The state hooks subject and QuizComponent are used to keep track of which subject button was pressed and which quiz component 
// to render, respectively.
function Home() {
  const [subject, setSubject] = useState(null);
  const [QuizComponent, setQuizComponent] = useState(null);

  // This function handles the button press event for each subject button.
  // It sets the QuizComponent state to the corresponding lazy-loaded component and sets the subject state to the subject name.
  // The switch statement ensures that the correct quiz component is loaded based on the subject name.
  const handleSubjectPress = (subject) => {
    switch (subject) {
      case 'data-structures':
        setQuizComponent(DataStructuresQuiz);
        break;
      case 'microprocessor':
        setQuizComponent(MicroprocessorQuiz);
        break;
      case 'java-programming':
        setQuizComponent(JavaProgrammingQuiz);
        break;
      default:
        break;
    }
    setSubject(subject);
  };

  const resetSubject = () => {
    setSubject(null);
  };


  // The return statement displays the appropriate component based on the current state of the subject and QuizComponent hooks.
  // If a subject button has been pressed, the QuizComponent is rendered with a fallback loader until it is loaded.
  // If no subject has been selected, the subject buttons are displayed using the View component.
  return (
    <View style={styles.container}>
      <ImageBackground
        source={engBg}
        resizeMode="cover"
        style={styles.image}>
        {subject ? (
          QuizComponent ? (
            <Suspense fallback={<View />}>
              <QuizComponent resetSubject={resetSubject} />
            </Suspense>
          ) : (
            <View />
          )
        ) : (
          <View style={styles.homepage}>
            <Text style={styles.question}>Which subject do you want to be quizzed on?</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubjectPress('data-structures')}>
              <Text style={styles.buttonText}>Data Structures and Algorithms</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubjectPress('microprocessor')}>
              <Text style={styles.buttonText}>Microprocessor and Interfacing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubjectPress('java-programming')}>
              <Text style={styles.buttonText}>Java Programming</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homepage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    minWidth: '80%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
