import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Quiz = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz Mode</Text>
        <Text style={styles.headerSubtitle}>Choose your challenge</Text>
      </View>
      
      {/* Cards Container */}
      <View style={styles.cardsContainer}>
        {/* Practice Card */}
        <Link href="/pract" asChild>
          <TouchableOpacity style={styles.card}>
            <LinearGradient
              colors={['#8B0000', 'rgb(250, 111, 111)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Ionicons name="book" size={28} color="white" />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Practice</Text>
                  <Text style={styles.cardDescription}>
                    Learn at your own pace with explanations
                  </Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Ionicons name="arrow-forward-circle" size={28} color="white" />
                </View>
              </View>
              
              <View style={styles.featureContainer}>
                <View style={styles.feature}>
                  <Ionicons name="infinite" size={16} color="white" />
                  <Text style={styles.featureText}>No time limit</Text>
                </View>
                <View style={styles.feature}>
                  <Ionicons name="bulb" size={16} color="white" />
                  <Text style={styles.featureText}>With hints</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Link>
        
        {/* Tournament Card */}
        <Link href="/tourn" asChild>
          <TouchableOpacity style={styles.card}>
            <LinearGradient
              colors={['#8B0000', '#FFC837']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Ionicons name="trophy" size={28} color="white" />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Tournament</Text>
                  <Text style={styles.cardDescription}>
                    Compete and climb the leaderboard
                  </Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Ionicons name="arrow-forward-circle" size={28} color="white" />
                </View>
              </View>
              
              <View style={styles.featureContainer}>
                <View style={styles.feature}>
                  <Ionicons name="time" size={16} color="white" />
                  <Text style={styles.featureText}>Timed challenges</Text>
                </View>
                <View style={styles.feature}>
                  <Ionicons name="people" size={16} color="white" />
                  <Text style={styles.featureText}>Compete </Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Link>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Select a mode to begin</Text>
      </View>
    </SafeAreaView>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
    height: 160,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 20,
    height: '100%',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
  },
  arrowContainer: {
    padding: 10,
  },
  featureContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  featureText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 13,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  },
});