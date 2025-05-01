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
import FinalQuizScore from './ScorePage/finalQuizScore';
import ResultsScreen from './ScorePage/finalresultsScreen';
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
          <Text style={styles.title}>Select a Quiz Set</Text>
          <View style={styles.setsContainer}>
            {quizSets.map((set, index) => (
              <TouchableOpacity
                key={set.set}
                style={styles.card}
                onPress={() => handleSelectSet(set.set)}
              >
                <View style={styles.iconContainer}>
                  {/* Replace this with an actual icon/image if needed */}
                  <Text style={styles.iconText}>📊</Text>
                </View>
        
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{set.title || `Set ${set.set}`}</Text>
                  <Text style={styles.cardSubtitle}>
                    {set.description || `${set.questions.length} questions`}
                  </Text>
                </View>
        
                <Text style={styles.arrow}>›</Text>
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
            <HeaderProgressAndScore score={score} totalQuestions={totalQuestions} currentIndex={currentIndex} currentQuestion={currentQuestion}/>
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
  ButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#121420',
    paddingHorizontal: 16,
  },
  setsContainer: {
    gap: 12,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  iconContainer: {
    backgroundColor: '#e0e7ff',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  arrow: {
    fontSize: 24,
    color: '#a0aec0',
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
