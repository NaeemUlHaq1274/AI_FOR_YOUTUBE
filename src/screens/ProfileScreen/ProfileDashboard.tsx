import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { ICONS_PATHS, IMAGES_PATHS, MY_COLORS } from '@constants';
import { MyText } from '@components';
import { adjust } from '@utils';
import { useAuth } from '@context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface SectionItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress: () => void;
  color?: string;
}

const SectionItem: React.FC<SectionItemProps> = ({ icon, title, onPress, color = MY_COLORS.WHITE }) => (
  <TouchableOpacity onPress={onPress} style={styles.sectionItem}>
    <View style={styles.sectionItemContent}>
      <Image source={icon} style={styles.sectionItemIcon} />
      <MyText style={[styles.sectionItemText, { color }]}>{title}</MyText>
    </View>
  </TouchableOpacity>
);

const ProfileDashboard: React.FC = () => {
  const { currentUser, logout, setResults } = useAuth();

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount();
              logout();
            } catch (error) {
              console.error('Error deleting account:', error);
              setResults('Error deleting account. Please try again.');
            }
          },
        },
      ]
    );
  };

  const deleteAccount = async () => {
    if (currentUser) {
      try {
        await auth().currentUser?.delete();
        await firestore().collection('Users').doc(currentUser.uid).delete();
      } catch (error) {
        console.error('Error deleting account:', error);
        throw error;
      }
    }
  };

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <MyText style={styles.loadingText}>Loading...</MyText>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {currentUser.photoURL ? (
          <Image source={{ uri: currentUser.photoURL }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <View style={styles.headerTextContainer}>
          <MyText style={styles.userName} p bold>
            {currentUser.displayName || 'User Name'}
          </MyText>
          <MyText style={styles.userEmail} p color={MY_COLORS.DARK_GRAY}>
            {currentUser.email || 'example@gmail.com'}
          </MyText>
        </View>
      </View>

      <Image source={ICONS_PATHS.LOGO} style={styles.logo} />

      <View style={styles.section}>
        <MyText style={styles.sectionTitle} p bold>
          Go premium now!
        </MyText>
        <SectionItem
          icon={ICONS_PATHS.MANAGE_SUBSCRIPTION_ICON}
          title="Manage subscription"
          onPress={() => { }}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <MyText style={styles.sectionTitle} p bold>
          Help & support
        </MyText>
        <SectionItem icon={ICONS_PATHS.ALERT_ICON} title="Report a problem" onPress={() => { }} />
        <SectionItem icon={ICONS_PATHS.HELP_CENTER_ICON} title="Help center" onPress={() => { }} />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <MyText style={styles.sectionTitle} p bold>
          Privacy setting
        </MyText>
        <SectionItem icon={ICONS_PATHS.TERM_CONDITION_ICON} title="Terms & Conditions" onPress={() => { }} />
        <SectionItem icon={ICONS_PATHS.PRIVACY} title="Privacy & Policy" onPress={() => { }} />
        <SectionItem icon={ICONS_PATHS.TELL_A_FRIEND} title="Tell a friend" onPress={() => { }} />
        <SectionItem icon={ICONS_PATHS.FEEDBACK_ICON} title="Feedback" onPress={() => { }} />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <SectionItem
          icon={ICONS_PATHS.DELETE_ICON}
          title="Delete account"
          onPress={handleDeleteAccount}
          color={MY_COLORS.PRIMARY}
        />
        <SectionItem
          icon={ICONS_PATHS.SWITCH_OFF}
          title="Log out"
          onPress={logout}
          color={MY_COLORS.PRIMARY}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: MY_COLORS.BLACK,
    paddingHorizontal: adjust(12),
    paddingVertical: adjust(8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    gap: adjust(12),
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    flexShrink: 0,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    flexShrink: 0,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    color: MY_COLORS.WHITE,
    textTransform: "capitalize",
  },
  userEmail: {
    color: MY_COLORS.DARK_GRAY,
  },
  logo: {
    width: '50%',
    height: 50,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'auto',
    gap: adjust(16),
  },
  sectionTitle: {
    color: MY_COLORS.WHITE,
  },
  sectionItem: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    height: 'auto',
  },
  sectionItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionItemIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  sectionItemText: {
    color: MY_COLORS.WHITE,
  },
  divider: {
    height: 1,
    backgroundColor: MY_COLORS.DARK_GRAY,
    marginVertical: adjust(12),
  },
  loadingText: {
    color: MY_COLORS.WHITE,
    textAlign: 'center',
  },
});

export default ProfileDashboard;
