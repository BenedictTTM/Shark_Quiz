import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link } from '@react-navigation/native';
import quizMode from '../constants/quizMode.json'

const QuizSets = () => {
  const [quizData, setQuizData] = useState();
  
  // In a real app, you would fetch this from an API or import directly
  useEffect(() => {
    // This is your JSON data that would normally be fetched or imported
  const quizData = quizMode;

    setQuizData(quizData)
  }, []);
  
  if (!quizData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading quiz sets...</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Quiz Sets</Text>
          <Text style={styles.subHeaderText}>Select a set to start</Text>
        </View>
        
        <View style={styles.setsContainer}>
          {quizData.quiz.map((set, index) => (
            <Link
              key={index}
              to={{ 
                screen: 'Pract', 
                params: { 
                  setId: set.set,
                  questions: set.questions 
                } 
              }}
              style={styles.setButton}
            >
              <View style={styles.buttonInner}>
                <Text style={styles.okSymbol}>👌</Text>
              </View>
              <Text style={styles.setTitle}>Set {set.set}</Text>
              <Text style={styles.setSubtitle}>{set.questions.length} Questions</Text>
            </Link>
          ))}
        </View>
        
        {/* Start Lesson Button */}
      
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizSets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2331',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    color: '#a0a0a0',
    fontSize: 16,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  setsContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  setButton: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  buttonInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2ecc71', // Green color like in the image
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // Shadow effect
    elevation: 8,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  okSymbol: {
    fontSize: 28,
    color: '#fff3e0', // Light cream color for the OK symbol
  },
  setTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  setSubtitle: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  startLessonButton: {
    backgroundColor: 'rgba(40, 44, 52, 0.8)', // Dark semi-transparent button
    width: 200,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // Shadow effect
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  startButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pencilIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});