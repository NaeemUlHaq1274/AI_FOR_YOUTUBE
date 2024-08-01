import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { ICONS_PATHS, MY_COLORS } from '@constants';
import { MyText } from '@components';
import { adjust } from '@utils';

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
      <MyText style={{ color }}>{title}</MyText>
    </View>
  </TouchableOpacity>
);

const ProfileDashboard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={ICONS_PATHS.USER_PROFILE} style={styles.profileImage} />
        <View style={styles.headerTextContainer}>
          <MyText style={styles.userName} p bold>User Name</MyText>
          <MyText style={styles.userEmail} p color={MY_COLORS.DARK_GRAY}>example@gmail.com</MyText>
        </View>
      </View>

      <View style={styles.section}>
        <MyText style={styles.sectionTitle} p bold>Go premium now!</MyText>
        <SectionItem icon={ICONS_PATHS.MANAGE_SUBSCRIPTION_ICON} title="Manage subscription" onPress={() => { }} />
      </View>
      <View style={styles.divider} />

      <View style={styles.section}>
        <MyText style={styles.sectionTitle} p bold>Help & support</MyText>
        <SectionItem icon={ICONS_PATHS.ALERT_ICON} title="Report a problem" onPress={() => { }} />
        <SectionItem icon={ICONS_PATHS.HELP_CENTER_ICON} title="Help center" onPress={() => { }} />
      </View>
      <View style={styles.divider} />

      <View style={styles.section}>
        <MyText style={styles.sectionTitle} p bold>Privacy setting</MyText>
        <SectionItem icon={ICONS_PATHS.TERM_CONDITION_ICON} title="Terms & Conditions" onPress={() => { }} />
        <SectionItem icon={ICONS_PATHS.PRIVACY} title="Privacy & Policy" onPress={() => { }} />
        <SectionItem icon={ICONS_PATHS.TELL_A_FRIEND} title="Tell a friend" onPress={() => { }} />
        <SectionItem icon={ICONS_PATHS.FEEDBACK_ICON} title="Feedback" onPress={() => { }} />
      </View>
      <View style={styles.divider} />

      <View style={styles.section}>
        <SectionItem icon={ICONS_PATHS.DELETE_ICON} title="Delete account" onPress={() => { }} color={MY_COLORS.PRIMARY} />
        <SectionItem icon={ICONS_PATHS.SWITCH_OFF} title="Log out" onPress={() => { }} color={MY_COLORS.PRIMARY} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MY_COLORS.BLACK,
    padding: adjust(14),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100, // Adjust based on the content
    gap: adjust(6),
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    flexShrink: 0,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    color: MY_COLORS.WHITE,
  },
  userEmail: {
    color: MY_COLORS.DARK_GRAY,
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'auto', // Adjust based on the content
    gap: adjust(12),
  },
  sectionTitle: {
    color: MY_COLORS.WHITE,
  },
  sectionItem: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    height: 'auto', // Adjust based on the content
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
    marginVertical: adjust(6),
  },
});

export default ProfileDashboard;
