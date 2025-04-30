import { View, Text , StyleSheet } from 'react-native'
import React from 'react'

const finalQuizScore = ({score, totalQuestions}) => {
  return (
    <View>
        {/* Circle progress indicator */}
                   <View style={styles.scoreCircleContainer}>
                     <View style={styles.scoreCircle}>
                       <Text style={styles.resultsPercentage}>
                         {Math.round((score / totalQuestions) * 100)}%
                       </Text>
                     </View>
                   </View>
                   
                   <View style={styles.resultsMessage}>
                     <Text style={styles.resultsMessageText}>
                       {score === totalQuestions 
                         ? "Perfect! You got all questions correct!"
                         : score >= totalQuestions * 0.7
                         ? "Great job! You're doing well!"
                         : score >= totalQuestions * 0.5
                         ? "Good effort! Keep practicing!"
                         : "Keep studying and try again!"}
                     </Text>
                   </View>
    </View>
  )
}

export default finalQuizScore

const styles = StyleSheet.create({
    // Results Screen
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  resultsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  resultsScore: {
    fontSize: 18,
    color: '#a0aec0',
    marginBottom: 24,
  },
  scoreCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#2a3042',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#34d399',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  resultsPercentage: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#34d399',
  },
  resultsMessage: {
    backgroundColor: '#2a3042',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  resultsMessageText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    lineHeight: 24,
  },
  resultButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  resultButton: {
    backgroundColor: '#34d399',
    paddingVertical: 14,
    borderRadius: 30,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  resultButtonText: {
    color: '#121420',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: '#60a5fa',
  }
})