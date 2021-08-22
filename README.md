# ayoba-microapp-boilerplate

Inspired by https://stackoverflow.com/questions/20256760/javascript-console-log-to-html

Usage: Add a URL parameter debug=true to enable the debug window to show on the page.

This project demonstrates the basic workflow and lifecyle of a microapp. It waits for an onNicknameChanged event to signal that the Ayoba object is ready to be called.

If the app is loaded outside of ayoba, a stub object is instantiated for testing.