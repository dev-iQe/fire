// index.js - نقطة الدخول المخصصة
// الهدف: مهما حصل، لازم "main" تتسجل عشان التطبيق ميقفلش بصمت،
// وأي خطأ يتعرض في شاشة بدل ما يظهر Invariant Violation عام.

const React = require('react');
const { AppRegistry, View, Text, ScrollView, Alert } = require('react-native');

let lastError = null;

if (global.ErrorUtils) {
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    lastError = error;
    try {
      Alert.alert(
        isFatal ? 'خطأ فادح (Fatal)' : 'خطأ',
        String(error?.message || error) + '\n\n' + String(error?.stack || ''),
        [{ text: 'OK' }]
      );
    } catch (e) {
      console.log('CRASH ERROR:', error);
    }
  });
}

function CrashFallback({ message }) {
  return React.createElement(
    ScrollView,
    { style: { flex: 1, backgroundColor: '#000' }, contentContainerStyle: { padding: 20, paddingTop: 60 } },
    React.createElement(Text, { style: { color: 'red', fontSize: 16, marginBottom: 10 } }, 'حصل خطأ أثناء تحميل التطبيق:'),
    React.createElement(Text, { style: { color: '#fff', fontSize: 12 } }, String(message))
  );
}

let AppComponent;
try {
  AppComponent = require('./App').default;
} catch (e) {
  AppComponent = function () {
    return React.createElement(CrashFallback, { message: (e && (e.stack || e.message)) || e });
  };
}

try {
  AppRegistry.registerComponent('main', () => AppComponent);
} catch (e) {
  AppRegistry.registerComponent('main', () =>
    function () {
      return React.createElement(CrashFallback, { message: (e && (e.stack || e.message)) || e });
    }
  );
}
