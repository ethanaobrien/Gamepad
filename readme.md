# Gamepad.js

A simple gamepad wrapper, using callbacks for events.

To use reference the "gamepad.js" file in your website via a script tag.<br>
This can be done by downloading the file or by using this url: https://raw.githack.com/ethanaobrien/Gamepad/main/gamepad.js

Example:

```html
<script src="https://raw.githack.com/ethanaobrien/Gamepad/main/gamepad.js"></script>
```

Example use:

```js
let gamepad;
try {
    // Will throw an error if getGamepads or setTimeout is unavailable
    gamepad = new Gamepad();
} catch(e) {
    console.warn('Gamepad not supported!', e);
    throw new Error('Gamepad not supported!');
}
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
