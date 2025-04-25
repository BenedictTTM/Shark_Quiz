import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

const Quiz = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6FA" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz Mode</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      {/* Quiz Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>Choose Your Challenge</Text>
        <Text style={styles.description}>
          Select a quiz mode that matches your learning style and goals.
        </Text>
      </View>
      
      {/* Mode Selection */}
      <View style={styles.modeContainer}>
        {/* Tournament Mode */}
        <TouchableOpacity style={styles.modeCard}>
          <ImageBackground 
            source={require('../../assets/images/tournament.png')} 
            style={styles.cardBackground}
            imageStyle={{ opacity: 0.15, borderRadius: 16 }}
          >
            <View style={styles.cardContent}>
              <View style={[styles.iconContainer, { backgroundColor: '#6C63FF20' }]}>
                <Ionicons name="trophy" size={28} color="#6C63FF" />
              </View>
              <Text style={styles.cardTitle}>Tournament</Text>
              <Text style={styles.cardDescription}>
                Compete against others in timed challenges to climb the leaderboard.
              </Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.statText}>5 min</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="help-circle-outline" size={16} color="#666" />
                  <Text style={styles.statText}>15 Q's</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="star-outline" size={16} color="#666" />
                  <Text style={styles.statText}>+120 pts</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.startButton, { backgroundColor: '#6C63FF' }]}>
                <Text style={styles.buttonText}>Start Tournament</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        
        {/* Practice Mode */}
        <TouchableOpacity style={styles.modeCard}>
          <ImageBackground 
            source={require('../../assets/images/tournament.png')} 
            style={styles.cardBackground}
            imageStyle={{ opacity: 0.15, borderRadius: 16 }}
          >
            <View style={styles.cardContent}>
              <View style={[styles.iconContainer, { backgroundColor: '#FF7A5920' }]}>
                <Ionicons name="book" size={28} color="#FF7A59" />
              </View>
              <Text style={styles.cardTitle}>Practice</Text>
              <Text style={styles.cardDescription}>
                Learn at your own pace with unlimited time and detailed explanations.
              </Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="infinite-outline" size={16} color="#666" />
                  <Text style={styles.statText}>No limit</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="help-circle-outline" size={16} color="#666" />
                  <Text style={styles.statText}>30 Q's</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="bulb-outline" size={16} color="#666" />
                  <Text style={styles.statText}>With hints</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.startButton, { backgroundColor: '#FF7A59' }]}>
                <Text style={styles.buttonText}>Start Practice</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      
      {/* Bottom Note */}
      <View style={styles.noteContainer}>
        <Ionicons name="information-circle" size={16} color="#777" />
        <Text style={styles.noteText}>
          Progress is synced across all your devices
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
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
  infoButton: {
    padding: 8,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  modeContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  modeCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardBackground: {
    width: '100%',
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#666',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  noteText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#777',
  },
});

export default Quiz;