import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

/**
 * QuizModeScreen Component
 * 
 * This screen allows users to select between Tournament and Practice quiz modes
 * Each mode is represented by a card with relevant information and styling
 */
const quiz = ({ navigation }) => {
  
  // Handle mode selection and navigate to the corresponding quiz screen
  const handleModeSelection = (mode) => {
    navigation.navigate('QuizStart', { mode });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Mode</Text>
        <View style={{ width: 24 }} /> {/* Empty view for alignment */}
      </View>
      
      {/* Description */}
      <Text style={styles.description}>
        Choose how you want to challenge yourself today
      </Text>
      
      {/* Mode Selection Cards */}
      <View style={styles.cardsContainer}>
        {/* Tournament Mode Card */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => handleModeSelection('tournament')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#6C63FF20' }]}>
            <Ionicons name="trophy" size={28} color="#6C63FF" />
          </View>
          
          <Text style={styles.cardTitle}>Tournament Mode</Text>
          
          <Text style={styles.cardDescription}>
            Compete against others with timed questions and climb the leaderboard
          </Text>
          
          <View style={styles.featureRow}>
            <View style={styles.feature}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.featureText}>Timed</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="trophy-outline" size={16} color="#666" />
              <Text style={styles.featureText}>Ranked</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#6C63FF' }]}
            onPress={() => handleModeSelection('tournament')}
          >
            <Text style={styles.buttonText}>Start Tournament</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        
        {/* Practice Mode Card */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => handleModeSelection('practice')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#4ECDC420' }]}>
            <Ionicons name="book" size={28} color="#4ECDC4" />
          </View>
          
          <Text style={styles.cardTitle}>Practice Mode</Text>
          
          <Text style={styles.cardDescription}>
            Learn at your own pace with full explanations and unlimited time
          </Text>
          
          <View style={styles.featureRow}>
            <View style={styles.feature}>
              <Ionicons name="infinite-outline" size={16} color="#666" />
              <Text style={styles.featureText}>No time limit</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="bulb-outline" size={16} color="#666" />
              <Text style={styles.featureText}>With hints</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#4ECDC4' }]}
            onPress={() => handleModeSelection('practice')}
          >
            <Text style={styles.buttonText}>Start Practice</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 8,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  featureRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  featureText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default quiz;