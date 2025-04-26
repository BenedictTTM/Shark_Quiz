import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  FlatList 
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';


const store = () => {
  const [userPoints, setUserPoints] = useState(2500);
  
  // Sample question packs data
  const questionPacks = [
    { id: '1', title: 'Science Pack', questions: 50, price: 300, image: require('@/assets/images/biology.png') },
    { id: '2', title: 'History Pack', questions: 40, price: 250, image: require('@/assets/images/biology.png') },
    { id: '3', title: 'Math Pack', questions: 60, price: 350, image: require('@/assets/images/biology.png') },
    { id: '4', title: 'Literature Pack', questions: 45, price: 280, image: require('@/assets/images/biology.png') },
  ];

  // Sample badges data
  const badges = [
    { id: '1', name: 'Quiz Master', description: 'Complete 100 quizzes', achieved: true, icon: 'trophy' },
    { id: '2', name: 'Science Whiz', description: 'Answer 50 science questions correctly', achieved: true, icon: 'atom' },
    { id: '3', name: 'Speed Demon', description: 'Complete a quiz in under 1 minute', achieved: false, icon: 'bolt' },
    { id: '4', name: 'Perfect Score', description: 'Get 100% on 10 quizzes', achieved: false, icon: 'award' },
    { id: '5', name: 'Consistent Learner', description: 'Complete quizzes for 7 days in a row', achieved: true, icon: 'calendar-check' },
  ];

  const handleBuyPack = (packId, price) => {
    if (userPoints >= price) {
      setUserPoints(userPoints - price);
      // Here you would add logic to unlock the question pack
      alert(`Successfully purchased pack #${packId}!`);
    } else {
      alert('Not enough points to purchase this pack!');
    }
  };

  const renderQuestionPack = ({ item }) => (
    <View style={styles.packContainer}>
      <Image source={item.image} style={styles.packImage} />
      <View style={styles.packInfo}>
        <Text style={styles.packTitle}>{item.title}</Text>
        <Text style={styles.packDetails}>{item.questions} questions</Text>
        <View style={styles.priceContainer}>
          <MaterialIcons name="stars" size={16} color="#FFD700" />
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[
          styles.buyButton, 
          userPoints < item.price ? styles.buyButtonDisabled : null
        ]}
        onPress={() => handleBuyPack(item.id, item.price)}
        disabled={userPoints < item.price}
      >
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBadge = ({ item }) => (
    <View style={[styles.badgeContainer, !item.achieved && styles.badgeUnachieved]}>
      <View style={styles.badgeIconContainer}>
        <FontAwesome5 name={item.icon} size={24} color={item.achieved ? "#FFD700" : "#CCCCCC"} />
      </View>
      <View style={styles.badgeInfo}>
        <Text style={styles.badgeName}>{item.name}</Text>
        <Text style={styles.badgeDescription}>{item.description}</Text>
      </View>
      {item.achieved && <MaterialIcons name="verified" size={20} color="#4CAF50" style={styles.badgeAchieved} />}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Points Display */}
      <View style={styles.pointsContainer}>
        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>YOUR POINTS</Text>
          <View style={styles.pointsValueContainer}>
            <MaterialIcons name="stars" size={24} color="#FFD700" />
            <Text style={styles.pointsValue}>{userPoints}</Text>
          </View>
        </View>
      </View>

      {/* Question Packs Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Question Packs</Text>
        <FlatList
          data={questionPacks}
          renderItem={renderQuestionPack}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      {/* Badges Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Badges</Text>
        <Text style={styles.badgesSubtitle}>
          {badges.filter(badge => badge.achieved).length} of {badges.length} badges earned
        </Text>
        <FlatList
          data={badges}
          renderItem={renderBadge}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  pointsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pointsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pointsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    letterSpacing: 0.5,
  },
  pointsValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 6,
    color: '#333333',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  packContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  packImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  packInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  packTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  packDetails: {
    fontSize: 13,
    color: '#666666',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginLeft: 4,
  },
  buyButton: {
    backgroundColor: '#4361EE',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonDisabled: {
    backgroundColor: '#B0BEC5',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  badgesSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeUnachieved: {
    opacity: 0.7,
  },
  badgeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  badgeDescription: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  badgeAchieved: {
    marginRight: 6,
  }
});

export default store;