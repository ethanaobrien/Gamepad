# Gamepad.js

A simple gamepad wrapper, using callbacks for events.

Example use:

```
let gamepad;
try {
    // Will throw an error if getGamepads or setTimeout is unavailable
    gamepad = new Gamepad();
} catch(e) {
    console.warn('Gamepad not supported!', e);
    return;
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
