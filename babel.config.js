module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin',['module:react-native-dotenv',{moduleName:'@env',path:'.env'},],],

  };
  };
