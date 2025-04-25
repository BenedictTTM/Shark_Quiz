import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Dimensions  } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Course from '../courses';

const { width } = Dimensions.get('window');

const Index = () => {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Quiz Master</Text>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={32} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="trophy" size={28} color="#FFD700" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statText}>Global Ranking</Text>
              <Text style={styles.statValue}>348</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statBox}>
            <Ionicons name="wallet" size={28} color="#FFD700" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statText}>Total Points</Text>
              <Text style={styles.statValue}>1,209</Text>
            </View>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Categories</Text>
          <TouchableOpacity style={styles.seeAllButton}>
  <Link href="/courses">
    <Text style={styles.seeAllText}>See All</Text>
  </Link>
  <Ionicons name="chevron-forward" size={16} color="#555" />
</TouchableOpacity>
        </View>

        {/* Category Grid */}


         <Course limit={4}/>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={styles.activityIconContainer}>
                <Ionicons name="checkmark-circle" size={20} color="#3CB371" />
              </View>
              <Text style={styles.activityLabel}>History Quiz</Text>
              <Text style={styles.activityDate}>Today</Text>
            </View>
            <View style={styles.activityStats}>
              <View style={styles.activityStat}>
                <Text style={styles.activityStatLabel}>Score</Text>
                <Text style={styles.activityStatValue}>85%</Text>
              </View>
              <View style={styles.activityStat}>
                <Text style={styles.activityStatLabel}>Time</Text>
                <Text style={styles.activityStatValue}>{time}</Text>
              </View>
              <View style={styles.activityStat}>
                <Text style={styles.activityStatLabel}>Points</Text>
                <Text style={styles.activityStatValue}>+120</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  profileButton: {
    padding: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    padding: 16,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statTextContainer: {
    marginLeft: 12,
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#555',
    fontSize: 14,
    marginRight: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: (width - 48) / 2,

    padding: 16,
    marginBottom: 16,
    elevation: 2,
    position: 'relative',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardImage: {
    width: 90,
    height: 90,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  questionCount: {
    fontSize: 13,
    color: '#777',
  },
  playButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 28,
    height: 28,
    backgroundColor: '#6200EE',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContainer: {
    marginBottom: 24,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  activityCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIconContainer: {
    marginRight: 12,
  },
  activityLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activityDate: {
    fontSize: 13,
    color: '#777',
  },
  activityStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityStat: {
    alignItems: 'center',
  },
  activityStatLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  activityStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default Index;
