import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import questions from '../constants/questions.json'

const Pract = () => {
    // Use useEffect to set a random start index only once when component mounts
    const [startIndex, setStartIndex] = useState(0);
    useEffect(() => {
        setStartIndex(Math.floor(Math.random() * Math.max(0, questions.questions.length - 10)));
    }, []);
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [quizCompleted, setQuizCompleted] = useState(false);
    
    // Get the current question from the questions array with offset
    const actualIndex = startIndex + currentQuestionIndex;
    const currentQuestion = questions.questions[actualIndex];
    
    const handleOptionSelect = (index) => {
        setSelectedOption(index);
        
        // Check if the answer is correct
        const correct = currentQuestion.options[index] === currentQuestion.answer;
        setIsCorrect(correct);
        
        // Update score if correct
        if (correct) {
            setScore(score + 10);
        }
        
        // Show feedback screen
        setShowFeedback(true);
    };
    
    const handleCloseFeedback = () => {
        setShowFeedback(false);
        
        // Increment question number
        const newQuestionNumber = questionNumber + 1;
        setQuestionNumber(newQuestionNumber);
        
        // Check if quiz should be completed
        if (newQuestionNumber > 10) {
            setQuizCompleted(true);
        } else {
            // Move to the next question
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null); // Reset selection for next question
            setShowOptions(false); // Hide options for next question
        }
    };
    
    const resetQuiz = () => {
        // Set a new random start index
        setStartIndex(Math.floor(Math.random() * Math.max(0, questions.questions.length - 10)));
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setScore(0);
        setShowOptions(false);
        setShowFeedback(false);
        setIsCorrect(false);
        setQuestionNumber(1);
        setQuizCompleted(false);
    };
       
    // Render feedback screen
    const renderFeedback = () => {
        return (
            <View style={styles.feedbackContainer}>
                <View style={styles.feedbackContent}>
                    <Text style={[styles.feedbackTitle, isCorrect ? styles.correctText : styles.incorrectText]}>
                        {isCorrect ? 'Correct Answer!' : 'Incorrect Answer!'}
                    </Text>
                    
                    {!isCorrect && (
                        <Text style={styles.correctAnswerText}>
                            The correct answer was: {currentQuestion.answer}
                        </Text>
                    )}
                    
                    <TouchableOpacity 
                        style={styles.closeButton} 
                        onPress={handleCloseFeedback}
                    >
                        <Text style={styles.closeButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
   
    // Handle quiz completion
    if (quizCompleted) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.questionText}>Quiz Completed!</Text>
                    <Text style={[styles.questionText, styles.scoreText]}>
                        Your Score: {score} out of 100
                    </Text>
                    <TouchableOpacity 
                        style={styles.resetButton} 
                        onPress={resetQuiz}
                    >
                        <Text style={styles.resetButtonText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.questionNumberText}>Question {questionNumber}/10</Text>
                <Text style={styles.questionText}>
                    {currentQuestion.question}
                </Text>
                <TouchableOpacity 
                    style={styles.showOptionsButton} 
                    onPress={() => setShowOptions(!showOptions)}
                >
                    <Text style={styles.showOptionsButtonText}>
                        {showOptions ? 'Hide Options' : 'Show Options'}
                    </Text>
                </TouchableOpacity>

                {showOptions && (
                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((option, index) => (
                            <TouchableOpacity 
                                key={index}
                                style={[
                                    styles.optionButton,
                                    selectedOption === index ? styles.selectedOption : null
                                ]}
                                onPress={() => handleOptionSelect(index)}
                                disabled={selectedOption !== null}
                            >
                                <Text style={styles.optionText}>
                                    {String.fromCharCode(97 + index)}. {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                
                {/* Display current score */}
                <Text style={styles.currentScoreText}>Score: {score}</Text>
                
                {/* Overlay feedback when shown */}
                {showFeedback && renderFeedback()}
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
    questionNumberText: {
        color: '#6b8cce',
        fontSize: 18,
        marginBottom: 10,
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
    showOptionsButton: {
        backgroundColor: '#384759',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#384759',
        opacity: 0.7,
    },
    showOptionsButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scoreText: {
        marginTop: 10,
        marginBottom: 40,
        textAlign: 'center',
    },
    currentScoreText: {
        color: '#6b8cce',
        fontSize: 18,
        position: 'absolute',
        top: 20,
        right: 20,
    },
    // Feedback screen styles
    feedbackContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    feedbackContent: {
        backgroundColor: '#2a3242',
        borderRadius: 12,
        padding: 30,
        width: '90%',
        alignItems: 'center',
    },
    feedbackTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    correctText: {
        color: '#4CAF50',
    },
    incorrectText: {
        color: '#F44336',
    },
    correctAnswerText: {
        color: 'white',
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#384759',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resetButton: {
        backgroundColor: '#4a6da7',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center',
    },
    resetButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});