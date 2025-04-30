import { View, Text , StyleSheet } from 'react-native'
import React from 'react'

const headerProgressAndScore = ({ selectedSet, score, totalQuestions, currentIndex, currentQuestion }) => {
  return (
    <View>
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${((currentIndex + 1) / totalQuestions) * 100}%` }
          ]} 
        />
      </View>
      
      <View style={styles.headerContainer}>
        <Text style={styles.setTitle}>Set {selectedSet}</Text>
        <Text style={styles.scoreText}>Score: {score}/{totalQuestions}</Text>
      </View>
      
      <View style={styles.questionContainer}>
        <Text style={styles.questionCounter}>
          Question {currentIndex + 1} of {totalQuestions}
        </Text>
        <Text style={styles.questionText}>{currentQuestion?.question}</Text>
      </View>
    </View>
  )
}

export default headerProgressAndScore

const styles = StyleSheet.create({
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#2a3042',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#34d399',
    borderRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  setTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#a0aec0',
  },
  questionContainer: {
    backgroundColor: '#2a3042',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  questionCounter: {
    fontSize: 14,
    color: '#a0aec0',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 20,
    color: 'white',
    lineHeight: 28,
    fontWeight: '500',
  },
});
