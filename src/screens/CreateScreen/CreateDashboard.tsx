import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, ScrollView, ImageSourcePropType, TouchableOpacity, Image, Text } from 'react-native';
import { MY_COLORS, IMAGES_PATHS, ICONS_PATHS, ADDITIONAL_OPTIONS, } from '@constants';
import { adjust } from '@utils';
import { LoadingScreen, ModalSheet, MyButton, MyHeader, MyScrollableContainer, MyText, MyTextInput } from '@components';
import RenderOption from './components/RenderOption';
import { useAuth } from '@context';
import OptionsContainer from './components/OptionContainer';

interface Option {
  title: string;
  iconPath?: ImageSourcePropType;
}
const CreateDashboard: React.FC = () => {

  const [unSelectedOptions, setUnSelectedOptions] = useState([
    { title: 'Include Title', iconPath: ICONS_PATHS.PLUS },
    { title: 'Include Description', iconPath: ICONS_PATHS.PLUS },
    { title: 'Include Tags', iconPath: ICONS_PATHS.PLUS },
    { title: 'Include Script', iconPath: ICONS_PATHS.PLUS },
    { title: 'Include Audio', iconPath: ICONS_PATHS.PLUS },
    { title: 'Include Thumbnail', iconPath: ICONS_PATHS.PLUS },
  ])

  const CATEGORIES: Option[] = [
    { title: 'Gaming' },
    { title: 'Education' },
    { title: 'Entertainment' },
    { title: 'Technology' },
  ];

  const SUBCATEGORIES: { [key: string]: Option[] } = {
    Gaming: [{ title: 'Action' }, { title: 'Adventure' }, { title: 'Strategy' }, { title: 'RPG' }],
    Education: [{ title: 'Science' }, { title: 'Math' }, { title: 'History' }, { title: 'Languages' }],
    Entertainment: [{ title: 'Movies' }, { title: 'TV Shows' }, { title: 'Comedy' }, { title: 'Vlogs' }],
    Technology: [{ title: 'Gadgets' }, { title: 'Software' }, { title: 'Programming' }, { title: 'Reviews' }],
  };
  const [visibleModal, setVisibleModal] = useState<false | 'REMOVE_MODAL' | 'CATEGORY_MODAL' | 'SUBCATEGORY_MODAL'>(false);
  const [selectedOptions, setSelectedOptions] = useState<any>([])
  const [theme, setTheme] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<'theme' | 'category' | 'script' | 'v-theme'>('theme');
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const [showRemoveItems, setShowRemoveItems] = useState<boolean>(false);

  const { currentUser } = useAuth();

  const handleChooseOption = (title: string) => {
    const selectedOption = unSelectedOptions.find(option => option.title === title);
    if (selectedOption) {
      const updatedOption = { ...selectedOption, iconPath: ICONS_PATHS.MINUS };
      const newUnSelectedOptions = unSelectedOptions.filter(option => option.title !== title);
      setSelectedOptions([...selectedOptions, updatedOption]);
      setUnSelectedOptions(newUnSelectedOptions);
    }
  };

  if (isLoading) return <LoadingScreen description="Generating your video content..." />;

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
        {selectedOption == 'theme' ? (
          <View style={{ gap: adjust(8) }}>
            <RenderOption title="Select Category" icon={ICONS_PATHS.MENU} onPress={() => setVisibleModal('CATEGORY_MODAL')} />
            <RenderOption title="Select Sub-Category" icon={ICONS_PATHS.MENU} onPress={() => setVisibleModal('SUBCATEGORY_MODAL')} />
          </View>
        ) : (
          <MyTextInput
            placeholder="Enter your video theme here..."
            value={theme}
            onChangeText={setTheme}
          />
        )}
      </View>


      {true && (
        <View style={{ gap: adjust(12) }}>
          <MyText p style={styles.labelText}>Choose Options</MyText>
          <OptionsContainer onPress={(title) => { handleChooseOption(title) }} options={unSelectedOptions} />
        </View>
      )}

      <View style={{ gap: adjust(8) }}>
        <View style={{ gap: 12 }}>
          <MyButton title="More options" btnType={showMoreOptions ? "primary" : "secondary"} onPress={() => { }} iconPath={showMoreOptions ? ICONS_PATHS.CARET_UP : ICONS_PATHS.CHEVRON} />
          {showMoreOptions && <OptionsContainer onPress={(title) => { }} options={ADDITIONAL_OPTIONS} />}
        </View>
        <MyButton title="Remove items" btnType={showRemoveItems ? "primary" : "secondary"} onPress={() => { setVisibleModal('REMOVE_MODAL') }} iconPath={showRemoveItems ? ICONS_PATHS.CARET_UP : ICONS_PATHS.CHEVRON} />
        <MyButton onPress={() => { }} title='Generate now' btnType='primary' iconPath={ICONS_PATHS.GENERATE_ICON} />
      </View>


      <ModalSheet visible={!!visibleModal} onRequestClose={() => { setVisibleModal(false) }}>
        {visibleModal === 'REMOVE_MODAL' && <OptionsContainer onPress={(title) => { handleChooseOption(title) }} options={selectedOptions} />}
        {visibleModal === 'CATEGORY_MODAL' && <OptionsContainer onPress={(title) => { handleChooseOption(title) }} options={CATEGORIES} />}
        {visibleModal === 'SUBCATEGORY_MODAL' && <OptionsContainer onPress={(title) => { handleChooseOption(title) }} options={SUBCATEGORIES.Education} />}

      </ModalSheet>

    </MyScrollableContainer>
  );
};

const styles = StyleSheet.create({
  labelText: {
    color: MY_COLORS.WHITE,
  },
});

export default CreateDashboard;