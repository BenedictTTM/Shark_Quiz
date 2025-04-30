import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import quizData from '../constants/quizMode.json';
import FinalQuizScore from './finalQuizScore';
import ResultsScreen from './finalresultsScreen';
import HeaderProgressAndScore from './headerProgressAndScore';

export default function QuizScreen() {
  // State variables
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [possibleAnswers, setPossibleAnswers] = useState<string[]>([]);

  // Quiz data
  const quizSets = quizData.quizSets;
  const { width, height } = Dimensions.get('window');

  // Get selected quiz set and current question
  const selectedQuizSet = selectedSet 
    ? quizSets.find(q => q.set === selectedSet) 
    : null;
  const currentQuestion = selectedQuizSet?.questions[currentIndex];
  const totalQuestions = selectedQuizSet?.questions.length || 0;

  // Handle quiz set selection
  const handleSelectSet = (set: string) => {
    setSelectedSet(set);
    setCurrentIndex(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setCompleted(false);
  };

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (showAnswer) return;
    setSelectedAnswer(answer);
    setShowAnswer(true);
    if (answer === currentQuestion?.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    } else {
      setCompleted(true);
    }
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  };

  // Reset quiz
  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setCompleted(false);
  };

  // Shuffle answers
  const getPossibleAnswers = () => {
    if (!currentQuestion) return [];
    if (currentQuestion.answers) {
      return currentQuestion.answers;
    } 
  };

  // Update shuffled answers on question change
  useEffect(() => {
    if (currentQuestion) {
      setPossibleAnswers(getPossibleAnswers());
    }
  }, [currentIndex, selectedSet]);

  // Start quiz
  const handleStartQuiz = () => {
    if (selectedSet) {
      setCurrentIndex(0);
      setScore(0);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setCompleted(false);
    }
  };

  // Render component
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Set Selection Screen */}
        {!selectedSet ? (
          <View>
            <LinearGradient
              colors={['#1a1e2a', '#121420']}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.title}>Select a Quiz Set</Text>
            <View style={styles.setsContainer}>
              {quizSets.map((set, index) => (
                <TouchableOpacity
                  key={set.set}
                  style={[
                    styles.setButton,
                    {
                      left: 0,
                      top: 0,
                      backgroundColor: selectedSet === set.set ? '#34d399' : '#2a3042',
                      transform: [{ scale: selectedSet === set.set ? 1.1 : 1 }]
                    }
                  ]}
                  onPress={() => handleSelectSet(set.set)}
                >
                  <Text style={[styles.setButtonText, { color: selectedSet === set.set ? '#121420' : '#ffffff' }]}>Set {set.set}</Text>
                  <Text style={[styles.setDescription, { color: selectedSet === set.set ? '#121420' : '#a0aec0' }]}>
                    {set.description || `${set.questions.length} questions`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : !completed ? (
          /* Quiz Screen */
          <View style={styles.quizContainer}>
            <LinearGradient
              colors={['#1a1e2a', '#121420']}
              style={StyleSheet.absoluteFill}
            />
            <HeaderProgressAndScore selectedSet={selectedSet} score={score} totalQuestions={totalQuestions} currentIndex={currentIndex} currentQuestion={currentQuestion}/>
            <View style={styles.answersContainer}>
              {possibleAnswers.map((answer, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.answerButton,
                    selectedAnswer === answer && styles.selectedAnswer,
                    showAnswer && answer === currentQuestion?.correctAnswer && styles.correctAnswer,
                    showAnswer && selectedAnswer === answer && answer !== currentQuestion?.correctAnswer && styles.incorrectAnswer
                  ]}
                  onPress={() => handleAnswerSelect(answer)}
                  disabled={showAnswer}
                >
                  <Text style={[
                    styles.answerText,
                    showAnswer && answer === currentQuestion?.correctAnswer && styles.correctAnswerText,
                    showAnswer && selectedAnswer === answer && answer !== currentQuestion?.correctAnswer && styles.incorrectAnswerText
                  ]}>
                    {answer}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {showAnswer && (
              <View style={styles.feedbackContainer}>
                <Text style={styles.feedbackText}>
                  {selectedAnswer === currentQuestion?.correctAnswer
                    ? "Correct! Well done!"
                    : `Incorrect. The correct answer is: ${currentQuestion?.correctAnswer}`}
                </Text>
                <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                  <Text style={styles.nextButtonText}>
                    {currentIndex < totalQuestions - 1 ? "Next Question" : "See Results"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.navigationContainer}>
              <TouchableOpacity 
                style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
                onPress={handlePrevQuestion}
                disabled={currentIndex === 0}
              >
                <Text style={[styles.navButtonText, currentIndex === 0 && styles.disabledButtonText]}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.exitButton}
                onPress={() => {
                  Alert.alert("Exit Quiz?", "Your progress will be lost.", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Exit", onPress: () => setSelectedSet(null) }
                  ]);
                }}
              >
                <Text style={styles.exitButtonText}>Exit Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <FinalQuizScore score={score} totalQuestions={totalQuestions} />
            <ResultsScreen score={score} totalQuestions={totalQuestions} handleResetQuiz={handleResetQuiz} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121420',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  setsContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
  },
  setButton: {
    position: 'absolute',
    width: 150,
    padding: 15,
    borderRadius: 18,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  setButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  setDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  quizContainer: {
    flex: 1,
    padding: 16,
  },
  answersContainer: {
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: '#2a3042',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3f4865',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  answerText: {
    fontSize: 16,
    color: 'white',
  },
  selectedAnswer: {
    borderColor: '#60a5fa',
    borderWidth: 2,
  },
  correctAnswer: {
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    borderColor: '#34d399',
    borderWidth: 2,
  },
  incorrectAnswer: {
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
    borderColor: '#f87171',
    borderWidth: 2,
  },
  correctAnswerText: {
    color: '#34d399',
    fontWeight: 'bold',
  },
  incorrectAnswerText: {
    color: '#f87171',
    fontWeight: 'bold',
  },
  feedbackContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: 'white',
  },
  nextButton: {
    backgroundColor: '#34d399',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#121420',
    fontSize: 16,
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 20,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#2a3042',
  },
  navButtonText: {
    color: 'white',
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: '#1a1e2a',
    opacity: 0.5,
  },
  disabledButtonText: {
    color: '#a0aec0',
  },
  exitButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#f87171',
  },
  exitButtonText: {
    color: '#f87171',
    fontSize: 14,
  },
});
