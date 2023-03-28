//DataStructuresQuiz.js

import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shuffle } from 'lodash';


import dsa_bg from './images/dsa/dsa_bg.png';


// Define the quiz questions as an array of objects
import { data } from './qansdata/dsaqans';

const questions = shuffle(data.questions).slice(0, 4);



// Define the DataStructuresQuiz component
export default function DataStructuresQuiz({ resetSubject }) {
    // Define state variables for the current question number, the user's score, and whether the quiz has been completed
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const question = questions[currentQuestion];
    const [currentImage, setCurrentImage] = useState(question.image);


    // This function handles the user's answer to a quiz question. It checks if the answer is correct, updates the user's score 
    // accordingly, and proceeds to the next question if there are more questions. If all questions have been answered, it saves the user's 
    // score to AsyncStorage and sets the quiz as completed.
    const handleAnswer = (answer) => {
        if (answer === question.answer) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setCurrentImage(questions[nextQuestion].image);
        } else {
            AsyncStorage.setItem('quiz_score', score.toString());
            setQuizCompleted(true);
        }
    };

    // This function resets the quiz by setting the current question number, user's score, and quiz completion status to their initial values.
    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizCompleted(false);
    };

    const resetToHome = () => {
        resetQuiz();
        resetSubject();
    };



    // Listen for the back button press and call resetToHome function
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            resetToHome();
            return true;
        });

        return () => backHandler.remove();
    }, []);


    // This component renders the Data Structures Quiz. It displays the current question and answer options if the quiz is not completed, 
    // and the user's final score and options to restart the quiz or choose a different subject if the quiz is completed. 
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Data Structures Quiz</Text>
            {quizCompleted ? (
                <View >
                    <View style={styles.imageContainer}>
                        <Image source={dsa_bg} resizeMode='center' style={styles.image} />
                    </View>
                    <Text style={styles.result} >
                        You scored {score} out of {questions.length}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={resetQuiz}>
                        <Text style={styles.buttonText}>Take the quiz again!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={resetToHome}>
                        <Text style={styles.buttonText}>Try a different subject!</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View >
                    <Text style={styles.question}>{questions[currentQuestion].question}</Text>
                    <View style={styles.imageContainer}>
                        <Image source={(currentImage)} resizeMode='center' style={styles.image} />
                    </View>
                    {questions[currentQuestion].options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={styles.button}
                            onPress={() => handleAnswer(option)}>
                            <Text style={styles.buttonText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000000',
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#000000',
        width:350,
        alignSelf: 'center'

    },
    button: {
        backgroundColor: '#964B00',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        width:350,
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    result: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        marginVertical: 20,
    }
});