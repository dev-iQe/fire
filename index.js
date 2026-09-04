// index.js - نقطة الدخول المخصصة
// الهدف: تسجيل ماسك الأخطاء قبل أي كود تاني يتحمل، عشان نمسك حتى أخطاء التحميل (import errors)

const { Alert } = require('react-native');

if (global.ErrorUtils) {
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
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

let App;
try {
  App = require('./App').default;
} catch (e) {
  // لو حتى تحميل App.js نفسه فشل، هنعرض الخطأ في تطبيق بديل بسيط بدل ما يقفل بصمت
  const React = require('react');
  const { View, Text } = require('react-native');
  App = function CrashFallback() {
    return React.createElement(
      View,
      { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#000' } },
      React.createElement(Text, { style: { color: 'red', fontSize: 14 } }, String(e?.message || e)),
      React.createElement(Text, { style: { color: '#fff', fontSize: 10, marginTop: 10 } }, String(e?.stack || ''))
    );
  };
}

const { registerRootComponent } = require('expo');
registerRootComponent(App);
