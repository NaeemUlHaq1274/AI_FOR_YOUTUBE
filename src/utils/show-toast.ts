import { ToastAndroid } from 'react-native';
import _ from 'lodash';

const showToastFunc = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    2000,
    ToastAndroid.BOTTOM,
    0,
    230
  );
};

export const showToast = _.debounce(showToastFunc, 200); 