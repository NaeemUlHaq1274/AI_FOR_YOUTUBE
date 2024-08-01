// CreateDashboard.tsx
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, ImageSourcePropType } from 'react-native';
import {
  MY_COLORS,
  IMAGES_PATHS,
  ICONS_PATHS,
  DASHBOARD_ITEMS,
  additionalOptions
} from '@constants';
import { adjust } from '@utils';
import { LoadingScreen, MyButton, MyHeader, MyText } from '@components';
import RenderOption from './components/RenderOption';
import GenerationMethodModal from './components/GenerationMethodModal';
import CategoryModal from './components/CategoryModal';
import SubcategoryModal from './components/SubcategoryModal';
import ThemeInput from './components/ThemeInput';
import CategorySelection from './components/CategorySelection';
import { useAuth } from '@context';

const CreateDashboard: React.FC = () => {
  const [theme, setTheme] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<'theme' | 'category' | 'script' | 'v-theme'>('theme');
  const [categoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);

  const { currentUser } = useAuth();

  const handleGenerate = () => {
    if (selectedOption === 'theme' && theme.trim() === '') {
      console.log('Please enter a theme');
      return;
    }
    if (selectedOption === 'category' && (!selectedCategory || !selectedSubcategory)) {
      console.log('Please select a category and subcategory');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Generated content for ${selectedOption}:`, selectedOption === 'theme' ? theme : `${selectedCategory} - ${selectedSubcategory}`);
    }, 2000);
  };

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  if (isLoading) {
    return <LoadingScreen description="Generating your video content..." />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <MyHeader
          color={MY_COLORS.BLACK}
          title="Creator BOOST"
          iconPath={IMAGES_PATHS.BLACK_FEEDBACK as ImageSourcePropType}
          onPressIcon={() => {/* Handle menu press */ }}
          rightIcon={currentUser?.photoURL ? { uri: currentUser.photoURL } : ICONS_PATHS.USER_PROFILE}
        />
      </View>

      {selectedOption === 'theme' ? (
        <ThemeInput theme={theme} setTheme={setTheme} handleIconPress={() => setModalVisible(true)} />
      ) : (
        <CategorySelection
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          handleCategoryPress={() => setCategoryModalVisible(true)}
          handleSubcategoryPress={() => setSubcategoryModalVisible(true)}
          handleIconPress={() => setModalVisible(true)}
        />
      )}

      <View style={styles.optionsContainer}>
        <View style={styles.optionsHeader}>
          <MyText p style={styles.labelText}>Choose Options</MyText>
        </View>
        <View style={styles.optionsWrapper}>
          {DASHBOARD_ITEMS.map(option => (
            <RenderOption key={option} title={option} icon={ICONS_PATHS.PLUS} />
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <MyButton
          title={"More options"}
          btnType="secondary"
          onPress={toggleMoreOptions}
          style={styles.moreOptionsButton}
          textColor={MY_COLORS.PRIMARY}
          btnWidth="100%"
          iconPath={showMoreOptions ? ICONS_PATHS.CARET_UP : ICONS_PATHS.CHEVRON}
          iconPosition="left"
        />
        {showMoreOptions && (
          <View style={styles.moreOptionsContainer}>
            {additionalOptions.map(option => (
              <RenderOption key={option.title} title={option.title} icon={option.icon} />
            ))}
          </View>
        )}

        <MyButton
          title="Remove items"
          btnType="secondary"
          onPress={() => {/* Handle remove items */ }}
          style={styles.removeItemsButton}
          textColor={MY_COLORS.PRIMARY}
          btnWidth="100%"
        />

        <MyButton
          title="Generate now"
          onPress={handleGenerate}
          iconPath={ICONS_PATHS.GENERATE_ICON as ImageSourcePropType}
          style={styles.generateButton}
          textColor={MY_COLORS.WHITE}
          btnWidth="100%"
        />
      </View>


      <GenerationMethodModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <CategoryModal
        visible={categoryModalVisible}
        setVisible={setCategoryModalVisible}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />

      <SubcategoryModal
        visible={subcategoryModalVisible}
        setVisible={setSubcategoryModalVisible}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: MY_COLORS.BLACK,
    paddingHorizontal: adjust(12),
    paddingVertical: adjust(8),
    gap: adjust(20),
  },
  labelText: {
    color: MY_COLORS.WHITE,
  },
  optionsContainer: {
    gap: adjust(6),
  },
  optionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: adjust(8),
  },
  optionsWrapper: {
    gap: adjust(8),
  },
  buttonContainer: {
    gap: adjust(12),
  },
  moreOptionsButton: {
    borderColor: MY_COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: adjust(12),
  },
  removeItemsButton: {
    borderColor: MY_COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: adjust(12),
  },
  generateButton: {
    backgroundColor: MY_COLORS.PRIMARY,
    borderRadius: 8,
    paddingVertical: adjust(12),
  },
  moreOptionsContainer: {
    gap: adjust(8),
  },
});

export default CreateDashboard;
