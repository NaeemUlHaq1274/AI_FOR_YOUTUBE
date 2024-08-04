import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, ScrollView, ImageSourcePropType, TouchableOpacity, Image } from 'react-native';
import {
  MY_COLORS,
  IMAGES_PATHS,
  ICONS_PATHS,
  DASHBOARD_ITEMS,
  ADDITIONAL_OPTIONS,
} from '@constants';
import { adjust } from '@utils';
import { LoadingScreen, MyButton, MyHeader, MyScrollableContainer, MyText, MyTextInput } from '@components';
import RenderOption from './components/RenderOption';
import GenerationMethodModal from './components/GenerationMethodModal';
import CategoryModal from './components/CategoryModal';
import SubcategoryModal from './components/SubcategoryModal';
import ThemeInput from './components/ThemeInput';
import { useAuth } from '@context';

const CreateDashboard: React.FC = () => {

  const DASHBOARD_ITEMS = [
    { title: 'Include Title', iconPath: ICONS_PATHS.PLUS },
    { title: 'Include Description', iconPath: ICONS_PATHS.PLUS },
    { title: 'Include Tags', iconPath: ICONS_PATHS.PLUS },
    { title: 'Include Script', iconPath: ICONS_PATHS.PLUS },
    { title: 'Include Audio', iconPath: ICONS_PATHS.PLUS },
    { title: 'Include Thumbnail', iconPath: ICONS_PATHS.PLUS },
  ];









  const [theme, setTheme] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<'theme' | 'category' | 'script' | 'v-theme'>('theme');
  const [categoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showRemoveItems, setShowRemoveItems] = useState<boolean>(false);

  const { currentUser } = useAuth();

  // const handleGenerate = useCallback(() => {
  //   if (selectedOption === 'theme' && theme.trim() === '') {
  //     console.log('Please enter a theme');
  //     return;
  //   }
  //   if (selectedOption === 'category' && (!selectedCategory || !selectedSubcategory)) {
  //     console.log('Please select a category and subcategory');
  //     return;
  //   }
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     console.log(`Generated content for ${selectedOption}:`, selectedOption === 'theme' ? theme : `${selectedCategory} - ${selectedSubcategory}`);
  //   }, 2000);
  // }, [selectedOption, theme, selectedCategory, selectedSubcategory]);

  // const toggleMoreOptions = useCallback(() => {
  //   setShowMoreOptions((prev) => !prev);
  // }, []);

  // const handleItemClick = useCallback((item: string) => {
  //   setSelectedItems((prevItems) =>
  //     prevItems.includes(item) ? prevItems.filter((i) => i !== item) : [...prevItems, item]
  //   );
  // }, []);

  // const toggleShowRemoveItems = useCallback(() => {
  //   setShowRemoveItems((prev) => !prev);
  // }, []);

  // const availableItems = useMemo(() =>
  //   DASHBOARD_ITEMS.filter(item => !selectedItems.includes(item)),
  //   [selectedItems]);

  // const isRemoveButtonDisabled = useMemo(() =>
  //   selectedItems.length === 0,
  //   [selectedItems]);




  if (isLoading)  return <LoadingScreen description="Generating your video content..." />;

  return (
    <MyScrollableContainer contentContainerStyle={{ gap: 20 }} >

      <MyHeader
        color={MY_COLORS.BLACK}
        title="Creator BOOST"
        iconPath={IMAGES_PATHS.BLACK_FEEDBACK as ImageSourcePropType}
        onPressIcon={() => {/* Handle menu press */ }}
        rightIcon={currentUser?.photoURL ? { uri: currentUser.photoURL } : ICONS_PATHS.USER_PROFILE}
      />

      <View style={{ gap: adjust(12) }}>
        <TouchableOpacity style={{ alignSelf: "flex-end", paddingHorizontal: adjust(12) }} onPress={() => { }}>
          <Image source={ICONS_PATHS.SETTING_ICON} resizeMode='contain' />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <MyText>Generate by {selectedOption !== 'theme' ? "Category" : "Theme"}</MyText>
          <TouchableOpacity onPress={() => { }}>
            <Image source={ICONS_PATHS.NEXT} />
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

      {false && (
        <View style={{ gap: adjust(12) }}>
          <MyText p style={styles.labelText}>Choose Options</MyText>
          <OptionsContainer onPress={(title) => { }} options={DASHBOARD_ITEMS} />
        </View>
      )}

      <View style={{ gap: adjust(8) }}>
        <View style={{ gap: 12 }}>
          <MyButton title="More options" btnType={showMoreOptions ? "primary" : "secondary"} onPress={toggleMoreOptions} iconPath={showMoreOptions ? ICONS_PATHS.CARET_UP : ICONS_PATHS.CHEVRON} />
          {showMoreOptions && <OptionsContainer onPress={(title) => { }} options={ADDITIONAL_OPTIONS} />}
        </View>
        <MyButton title="Remove items" btnType={showRemoveItems ? "primary" : "secondary"} onPress={toggleShowRemoveItems} iconPath={showRemoveItems ? ICONS_PATHS.CARET_UP : ICONS_PATHS.CHEVRON} />
        <MyButton onPress={handleGenerate} title='Generate now' btnType='primary' iconPath={ICONS_PATHS.GENERATE_ICON} />
      </View>
      {/* 
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
      /> */}
    </MyScrollableContainer>
  );
};

const styles = StyleSheet.create({
  labelText: {
    color: MY_COLORS.WHITE,
  },
  optionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: adjust(8),
  },
  removeItemsButton: {
    borderColor: MY_COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: adjust(12),
  },
  disabledButton: {
    borderColor: MY_COLORS.DARK_GRAY,
  },
  generateButton: {
    backgroundColor: MY_COLORS.PRIMARY,
    borderRadius: 8,
    paddingVertical: adjust(12),
  },
});

export default CreateDashboard;




interface OptionsContainerProps {
  options: Option[];
  onPress: (title: string) => void;
}
interface Option {
  title: string;
  iconPath: ImageSourcePropType;
}

const OptionsContainer: React.FC<OptionsContainerProps> = ({ options, onPress }) => {
  return (
    <View style={{ gap: adjust(8) }}>
      {options.map((option, index) => (
        <RenderOption
          key={index} // Using index as key if option is not unique
          title={option.title}
          icon={option.iconPath}
          onPress={() => onPress(option.title)}
        />
      ))}
    </View>
  );
}