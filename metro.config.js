const {withNativeWind} = require('nativewind/metro');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    extraNodeModules: {
        '@': path.resolve(__dirname, './'),
        'components': path.resolve(__dirname, './src/components'),
        'views': path.resolve(__dirname, './src/views'),
        'hooks': path.resolve(__dirname, './src/hooks'),
    },
},
});

module.exports = withNativeWind(config, {
  input: './global.css',
});
