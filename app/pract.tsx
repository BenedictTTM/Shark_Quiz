import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import questions from '../constants/questions.json'

const Pract = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    
    // Get the current question from the questions array
    const currentQuestion = questions.questions[currentQuestionIndex];
    
    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };
    
    const handleNextQuestion = () => {
        // Check if the answer is correct before moving to next question
        if (selectedOption !== null) {
            const isCorrect = currentQuestion.options[selectedOption] === currentQuestion.answer;
            if (isCorrect) {
                setScore(score + 1);
            }
        }
        
        // Move to the next question or complete the quiz
        if (currentQuestionIndex < questions.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null); // Reset selection for next question
        } else {
            setQuizCompleted(true);
        }
    };
    
    // Handle quiz completion
    if (quizCompleted) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.questionText}>Quiz Completed!</Text>
                    <Text style={[styles.questionText, styles.scoreText]}>
                        Your Score: {score} out of {questions.questions.length}
                    </Text>
                    <TouchableOpacity 
                        style={styles.nextButton}
                        onPress={() => {
                            setCurrentQuestionIndex(0);
                            setSelectedOption(null);
                            setScore(0);
                            setQuizCompleted(false);
                        }}
                    >
                        <Text style={styles.nextButtonText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.questionText}>
                    {currentQuestion.question}
                </Text>
                
                <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[
                                styles.optionButton,
                                selectedOption === index ? styles.selectedOption : null
                            ]}
                            onPress={() => handleOptionSelect(index)}
                        >
                            <Text style={styles.optionText}>
                                {String.fromCharCode(97 + index)} . {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                
                <TouchableOpacity 
                    style={[
                        styles.nextButton,
                        selectedOption === null ? styles.disabledButton : null
                    ]}
                    onPress={handleNextQuestion}
                    disabled={selectedOption === null}
                >
                    <Text style={styles.nextButtonText}>
                        {currentQuestionIndex === questions.questions.length - 1 ? 'Finish' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Pract

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c2331',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    questionText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        lineHeight: 34,
    },
    optionsContainer: {
        marginBottom: 40,
    },
    optionButton: {
        backgroundColor: '#2a3242',
        padding: 20,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#3a4255',
    },
    selectedOption: {
        backgroundColor: '#3d4e6d',
        borderColor: '#6b8cce',
    },
    optionText: {
        color: 'white',
        fontSize: 18,
    },
    nextButton: {
        backgroundColor: '#4a6da7',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        backgroundColor: '#384759',
        opacity: 0.7,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scoreText: {
        marginTop: 10,
        marginBottom: 40,
        textAlign: 'center',
    }
});