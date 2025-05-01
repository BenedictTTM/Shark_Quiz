import { View, Text  , TouchableOpacity ,StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const resultsScreen = ({score, totalQuestions, handleResetQuiz , }) => {
  return (
    <View>
            <View style={styles.resultsContainer}>
            {/* Background gradient */}
            <LinearGradient
              colors={['#1a1e2a', '#121420']}
              style={StyleSheet.absoluteFill}
            />
            
            <Text style={styles.resultsTitle}>Quiz Completed!</Text>
            <Text style={styles.resultsScore}>
              Your Score: {score}/{totalQuestions}
            </Text>
            
           
            
            <View style={styles.resultButtonsContainer}>
              <TouchableOpacity 
                style={styles.resultButton}
                onPress={handleResetQuiz}
              >
                <Text style={styles.resultButtonText}>Try Again</Text>
              </TouchableOpacity>
              
              
              <Link href="/tourn" asChild>
      <TouchableOpacity style={[styles.resultButton, styles.homeButton]}>
        <Text style={styles.resultButtonText}>Back to Sets</Text>
      </TouchableOpacity>
    </Link>


    <Link href="/tourn" asChild>
  <TouchableOpacity style={[styles.resultButton, styles.homeButton]}>
    <Text style={styles.resultButtonText}>Back to Sets</Text>
  </TouchableOpacity>
</Link>
             
            </View>
          </View>
    </View>
  )
}

export default resultsScreen

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