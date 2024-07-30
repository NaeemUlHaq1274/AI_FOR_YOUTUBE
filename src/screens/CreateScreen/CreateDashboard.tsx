import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, ImageSourcePropType, Modal, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { MY_COLORS, IMAGES_PATHS, ICONS_PATHS, DASHBOARD_ITEMS, CATEGORIES, SUBCATEGORIES, LAYOUT } from '@constants';
import { adjust } from '@utils';
import { LoadingScreen, MyButton, MyHeader, MyText, MyTextInput } from '@components';
import RenderOption from './components/RenderOption';

const CreateDashboard: React.FC = () => {
  const [theme, setTheme] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<'theme' | 'category'>('theme');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [showSubcategories, setShowSubcategories] = useState<boolean>(false);

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleIconPress = () => {
    setModalVisible(true);
  };

  const handleGenerateByTheme = () => {
    setSelectedOption('theme');
    setModalVisible(false);
  };

  const handleGenerateByCategory = () => {
    setSelectedOption('category');
    setModalVisible(false);
  };

  const handleCategoryPress = () => {
    setShowCategories(true);
  };

  const handleSubcategoryPress = () => {
    if (selectedCategory) {
      setShowSubcategories(true);
    }
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
    setShowCategories(false);
  };

  const selectSubcategory = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setShowSubcategories(false);
  };

  const renderModalContent = (
    title: string,
    data: string[],
    onSelect: (item: string) => void,
    selectedItem: string
  ) => (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.modalButton, selectedItem === item && styles.selectedModalButton]}
            onPress={() => onSelect(item)}
          >
            <Text style={[styles.modalButtonText, selectedItem === item && styles.selectedModalButtonText]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          setShowCategories(false);
          setShowSubcategories(false);
        }}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );

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
          rightIcon={ICONS_PATHS.USER_PROFILE}
        />
      </View>

      <View style={{ gap: adjust(6) }}>
        {selectedOption === 'theme' ? (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <MyText p style={styles.labelText}>Generate by Theme</MyText>
              <TouchableOpacity onPress={handleIconPress}>
                <Image source={ICONS_PATHS.NEXT} style={styles.nextIcon} />
              </TouchableOpacity>
            </View>
            <MyTextInput
              placeholder="Enter the prompt for your video theme here..."
              value={theme}
              onChangeText={setTheme}
              style={styles.themeInput}
            />
          </>
        ) : (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <MyText p style={styles.labelText}>Generate by Category</MyText>
              <TouchableOpacity onPress={handleIconPress}>
                <Image source={ICONS_PATHS.NEXT} style={styles.nextIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.category} onPress={handleCategoryPress}>
              <MyText>{selectedCategory || 'Select Category'}</MyText>
              <Image source={ICONS_PATHS.MENU} style={styles.nextIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.category, !selectedCategory && styles.disabledCategory]}
              onPress={handleSubcategoryPress}
              disabled={!selectedCategory}
            >
              <MyText>{selectedSubcategory || 'Select Subcategory'}</MyText>
              <Image source={ICONS_PATHS.MENU} style={styles.nextIcon} />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.optionsHeader}>
          <MyText p style={styles.labelText}>Choose Options</MyText>
        </View>
        <View style={{ gap: adjust(8) }}>
          {DASHBOARD_ITEMS.map(option => (
            <RenderOption key={option} title={option} />
          ))}
        </View>
      </View>

      <View style={{ gap: adjust(6) }}>
        <MyButton
          title="More options"
          btnType="secondary"
          onPress={() => {/* Handle more options */ }}
          style={styles.moreOptionsButton}
          textColor={MY_COLORS.PRIMARY}
          btnWidth="100%"
        />
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

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Generation Method</Text>
            <TouchableOpacity
              onPress={handleGenerateByTheme}
              style={[styles.modalButton, selectedOption === 'theme' && styles.selectedModalButton]}
            >
              <Text style={[styles.modalButtonText, selectedOption === 'theme' && styles.selectedModalButtonText]}>
                Generate by Theme
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGenerateByCategory}
              style={[styles.modalButton, selectedOption === 'category' && styles.selectedModalButton]}
            >
              <Text style={[styles.modalButtonText, selectedOption === 'category' && styles.selectedModalButtonText]}>
                Generate by Category
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="fade"
        visible={showCategories}
        onRequestClose={() => setShowCategories(false)}
      >
        <View style={styles.modalOverlay}>
          {renderModalContent('Select Category', CATEGORIES, selectCategory, selectedCategory)}
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="fade"
        visible={showSubcategories}
        onRequestClose={() => setShowSubcategories(false)}
      >
        <View style={styles.modalOverlay}>
          {renderModalContent('Select Subcategory', selectedCategory ? SUBCATEGORIES[selectedCategory] : [], selectSubcategory, selectedSubcategory)}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CreateDashboard;

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
  themeInput: {
    backgroundColor: MY_COLORS.DARK_GRAY,
    color: MY_COLORS.WHITE,
    borderRadius: 8,
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
  nextIcon: {
    width: 24,
    height: 24,
  },
  moreOptionsButton: {
    borderColor: MY_COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
  },
  removeItemsButton: {
    borderColor: MY_COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
  },
  generateButton: {
    backgroundColor: MY_COLORS.PRIMARY,
    borderRadius: 8,
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: MY_COLORS.SECONDARY,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: MY_COLORS.WHITE,
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: MY_COLORS.PRIMARY,
  },
  selectedButtonText: {
    color: MY_COLORS.WHITE,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: MY_COLORS.DARK_GRAY,
    padding: adjust(8),
    borderRadius: 8,
  },
  disabledCategory: {
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: MY_COLORS.WHITE,
    borderRadius: LAYOUT.BORDER_RADIUS_MEDIUM,
    padding: LAYOUT.SPACING_MEDIUM,
    alignItems: 'stretch',
  },
  modalTitle: {
    fontSize: adjust(18),
    fontWeight: 'bold',
    color: MY_COLORS.BLACK,
    marginBottom: LAYOUT.SPACING_MEDIUM,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: MY_COLORS.DARK_GRAY,
    padding: LAYOUT.SPACING_SMALL,
    borderRadius: LAYOUT.BORDER_RADIUS_MEDIUM,
    marginBottom: LAYOUT.SPACING_SMALL,
  },
  modalButtonText: {
    color: MY_COLORS.WHITE,
    fontSize: adjust(16),
    textAlign: 'center',
  },
  selectedModalButton: {
    backgroundColor: MY_COLORS.PRIMARY,
  },
  selectedModalButtonText: {
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: LAYOUT.SPACING_SMALL,
    padding: LAYOUT.SPACING_SMALL,
    backgroundColor: MY_COLORS.BLACK,
    borderRadius: LAYOUT.BORDER_RADIUS_MEDIUM,
  },
  closeButtonText: {
    color: MY_COLORS.WHITE,
    fontSize: adjust(16),
    textAlign: 'center',
  },
});