import React, { useState } from 'react';
import { StyleSheet, View, ImageSourcePropType, TouchableOpacity, Image } from 'react-native';
import { MY_COLORS, IMAGES_PATHS, ICONS_PATHS, DASHBOARD_ITEMS, ADDITIONAL_OPTIONS, } from '@constants';
import { adjust } from '@utils';
import { LoadingScreen, MyButton, MyHeader, MyScrollableContainer, MyText, MyTextInput } from '@components';
import RenderOption from './components/RenderOption';
import { useAuth } from '@context';
import BottomSheet from './components/BottomSheet';

const CreateDashboard: React.FC = () => {
  const [theme, setTheme] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<'theme' | 'category' | 'script' | 'v-theme'>('theme');
  const [categoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState<boolean>(false);
  const [removeItemsModalVisible, setRemoveItemsModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showRemoveItems, setShowRemoveItems] = useState<boolean>(false);

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
    setShowMoreOptions((prev) => !prev);
  };

  const handleItemClick = (item: string) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(item) ? prevItems.filter((i) => i !== item) : [...prevItems, item]
    );
  };

  const toggleShowRemoveItems = () => {
    setShowRemoveItems((prev) => !prev);
    setRemoveItemsModalVisible((prev) => !prev);
  };

  const availableItems = DASHBOARD_ITEMS.filter(item => !selectedItems.includes(item));
  const isRemoveButtonDisabled = selectedItems.length === 0;
  const allItemsSelected = availableItems.length === 0;

  if (isLoading) {
    return <LoadingScreen description="Generating your video content..." />;
  }

  return (
    <MyScrollableContainer contentContainerStyle={{ gap: 12 }} >
      <MyHeader
        color={MY_COLORS.BLACK}
        title="Creator BOOST"
        iconPath={IMAGES_PATHS.BLACK_FEEDBACK as ImageSourcePropType}
        onPressIcon={() => {/* Handle menu press */ }}
        rightIcon={currentUser?.photoURL ? { uri: currentUser.photoURL } : ICONS_PATHS.USER_PROFILE}
      />

      <View style={{ gap: adjust(12) }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <MyText>Generate by {selectedOption !== 'theme' ? "Category" : "Theme"}</MyText>
            <TouchableOpacity onPress={() => { }}>
              <Image source={ICONS_PATHS.NEXT} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ alignSelf: "flex-end", paddingHorizontal: adjust(12) }} onPress={() => { }}>
            <Image source={ICONS_PATHS.SETTING_ICON} />
          </TouchableOpacity>
        </View>

        {selectedOption !== 'theme' ? (
          <View style={{ gap: adjust(8) }}>
            <RenderOption title="Select Category" icon={ICONS_PATHS.MENU} />
            <RenderOption title="Select Sub-Category" icon={ICONS_PATHS.MENU} />
          </View>
        ) : (
          <MyTextInput
            placeholder="Enter your video theme here..."
            value={theme}
            onChangeText={setTheme}
          />
        )}
      </View>

      {
        !allItemsSelected && (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsHeader}>
              <MyText p style={styles.labelText}>Choose Options</MyText>
            </View>
            <View style={styles.optionsWrapper}>
              {availableItems.map(option => (
                <RenderOption key={option} title={option} icon={ICONS_PATHS.PLUS} onPress={() => handleItemClick(option)} />
              ))}
            </View>
          </View>
        )
      }

      <View style={styles.buttonContainer}>
        <MyButton title="More options" btnType="secondary" onPress={toggleMoreOptions} iconPath={showMoreOptions ? ICONS_PATHS.CARET_UP : ICONS_PATHS.CHEVRON} />
        {showMoreOptions && (
          <View style={styles.moreOptionsContainer}>
            {ADDITIONAL_OPTIONS.map(option => (
              <RenderOption key={option.title} title={option.title} icon={option.icon} />
            ))}
          </View>
        )}
        <MyButton title="Remove items" btnType="secondary" onPress={toggleShowRemoveItems} iconPath={showRemoveItems ? ICONS_PATHS.CARET_UP : ICONS_PATHS.CHEVRON} />
        <MyButton title="Generate now" onPress={handleGenerate} iconPath={ICONS_PATHS.GENERATE_ICON as ImageSourcePropType} />
      </View>

      <BottomSheet
        visible={categoryModalVisible}
        setVisible={setCategoryModalVisible}
        selectedItem={selectedCategory}
        setSelectedItem={setSelectedCategory}
        type="category"
      />

      <BottomSheet
        visible={subcategoryModalVisible}
        setVisible={setSubcategoryModalVisible}
        selectedItem={selectedSubcategory}
        setSelectedItem={setSelectedSubcategory}
        type="subcategory"
        selectedCategory={selectedCategory}
      />

      <BottomSheet
        visible={removeItemsModalVisible}
        setVisible={setRemoveItemsModalVisible}
        selectedItem={null}
        setSelectedItem={() => { }}
        type="remove"
        items={selectedItems}
        handleItemClick={handleItemClick}
      />

    </MyScrollableContainer >
  );
};

const styles = StyleSheet.create({
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
  moreOptionsContainer: {
    gap: adjust(8),
  },
  removeItemsContainer: {
    gap: adjust(8),
  },
});

export default CreateDashboard;
