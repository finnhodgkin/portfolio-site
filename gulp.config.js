module.exports = _ => {
  var temp = './css/';
  var store = './store/';

  var config = {
    //FILES
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    css: temp + 'style.css',
    index: 'index.html',
    js: [
      '*.js'
    ],
    sass: store + '*.scss',
    temp: temp
  };

  return config;
};
