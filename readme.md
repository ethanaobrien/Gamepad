# Gamepad.js

A simple gamepad wrapper, using callbacks for events.

This is written using classes, uses ES6 classes and arrow functions. Requires chrome 49 or greater.<br>
The script will throw syntax errors on any older version of chrome. Other browsers not tested.

To use reference the "gamepad.js" file in your website via a script tag.<br>
This can be done by downloading the file or by using this url: https://raw.githack.com/ethanaobrien/Gamepad/main/gamepad.js

Example:

```html
<script src="https://raw.githack.com/ethanaobrien/Gamepad/main/gamepad.js"></script>
```

Example use:

```js
// On older browsers, the script will fail to run, meaning GamepadHandler is undefined.
// You can surround this in try {} catch(){} if you need to catch the reference error.
let gamepad = new GamepadHandler();
gamepad.on('connected', function(e) {
    // A gamepad has connected
    console.log('connected', e);
})
gamepad.on('disconnected', function(e) {
    // A gamepad has disconnected
    console.log('disconnected', e);
})
gamepad.on('axischanged', function(e) {
    // An axis has been changed
    console.log('axischanged', e);
})
gamepad.on('buttondown', function(e) {
    // A button has been pressed
    console.log('buttondown', e);
})
gamepad.on('buttonup', function(e) {
    // A button has been released
    console.log('buttonup', e);
})
```
