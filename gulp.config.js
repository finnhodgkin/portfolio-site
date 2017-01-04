module.exports = _ => {
  var temp = './.tmp/';
  var store = './store/';

  var config = {
    //FILES
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    css: temp + 'styles.css',
    index: 'index.html',
    js: [
      '*.js'
    ],
    sass: store + 'style.scss',
    temp: temp
  };
  
  return config;
};
