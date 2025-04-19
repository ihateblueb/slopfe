import { Appearance } from 'react-native';

let colorScheme = Appearance.getColorScheme();

export default colorScheme === 'dark'
    ? {
          bg1: '#140e1b',
          bg2: '#1a1423',
          bg3: '#261e37',
          bg4: '#3f325a',

          tx1: '#f3efff',
          tx2: '#d8cdf1',
          tx3: '#9688bd',

          ac1: '#865fdf',

          success: '#38b84d',
          warn: '#e39244',
          danger: '#e65448',

          boost: '#3eca55',
          like: '#eda437',
          bookmark: '#e43a67'
      }
    : {
          bg1: '#f7f3ff',
          bg2: '#e2ddef',
          bg3: '#cfc9dd',
          bg4: '#bdb6cd',

          tx1: '#000000',
          tx2: '#0f0a15',
          tx3: '#191220',

          ac1: '#865fdf',

          success: '#38b84d',
          warn: '#e39244',
          danger: '#dc3d30',

          boost: '#3eca55',
          like: '#eda437',
          bookmark: '#e43a67'
      };
