import React from 'react';
import { View, ImageSourcePropType } from 'react-native';
import { adjust } from '@utils';
import RenderOption from './RenderOption';

interface Option {
    title: string;
    iconPath?: ImageSourcePropType;
}

interface OptionsContainerProps {
    options: Option[];
    onPress: (title: string) => void;
}

const OptionsContainer: React.FC<OptionsContainerProps> = ({ options, onPress }) => {
    return (
        <View style={{ gap: adjust(8) }}>
            {options.map((option, index) => (
                <RenderOption
                    key={index}
                    title={option.title}
                    icon={option.iconPath}
                    onPress={() => onPress(option.title)}
                />
            ))}
        </View>
    );
};

export default OptionsContainer;