function Gamepad() {
    var gp = navigator.getGamepads || navigator.webkitGetGamepads;
    if (!gp) {
        throw new Error("get gamepads not found!");
    }
    if (!window.setTimeout) {
        throw new Error("setTimeout was not found!");
    }
    this.loop();
}
Gamepad.prototype = {
    gamepads: [],
    getGamepads: function() {
        return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    },
    timeout: null,
    terminate: function() {
        window.clearTimeout(this.timeout);
    },
    loop: async function() {
        this.updateGamepadState();
        this.timeout = setTimeout(this.loop.bind(this), 10);
    },
    updateGamepadState: function() {
        var gamepads = this.getGamepads();
        for (var i=0; i<gamepads.length; i++) {
            if (!gamepads[i]) continue;
            var hasGamepad = false;
            for (var j=0; j<this.gamepads.length; j++) {
                if (!this.gamepads[j]) continue;
                if (this.gamepads[j].index === gamepads[i].index) {
                    hasGamepad = true;
                    if (typeof this.onaxischanged == 'function') {
                        for (var q=0; q<this.gamepads[j].axes.length; q++) {
                            if (gamepads[i].axes[q] !== this.gamepads[j].axes[q]) {
                                var axis = function(index) {
                                    switch (index) {
                                        case 0:
                                            return 'LEFT_STICK_X';
                                        case 1:
                                            return 'LEFT_STICK_Y';
                                        case 2:
                                            return 'RIGHT_STICK_X';
                                        case 3:
                                            return 'RIGHT_STICK_Y';
                                        default:
                                            return '';
                                    }
                                }(q);
                                if (!axis) continue;
                                this.onaxischanged({axis:axis, value:gamepads[i].axes[q], index:i, gamepadIndex:gamepads[i].index});
                            }
                        }
                    }
                    for (var q=0; q<this.gamepads[j].buttons.length; q++) {
                        let pressed = this.gamepads[j].buttons[q] == 1.0;
                        if (typeof(this.gamepads[j].buttons[q]) == "object") {
                            pressed = this.gamepads[j].buttons[q].pressed;
                        }
                        let pressed2 = gamepads[i].buttons[q] == 1.0;
                        if (typeof(gamepads[i].buttons[q]) == "object") {
                            pressed2 = gamepads[i].buttons[q].pressed;
                        }
                        if (pressed !== pressed2) {
                            if (pressed2) {
                                if (typeof this.onbuttondown == 'function') {
                                    this.onbuttondown({index:q, gamepadIndex:gamepads[i].index});
                                }
                            } else {
                                if (typeof this.onbuttonup == 'function') {
                                    this.onbuttonup({index:q, gamepadIndex:gamepads[i].index});
                                }
                            }
                        }
                    }
                    this.gamepads[j] = gamepads[i];
                }
            }
            if (!hasGamepad) {
                this.gamepads.push(gamepads[i]);
                if (typeof this.onconnected == 'function') {
                    this.onconnected();
                }
            }
        }
        for (var j=0; j<this.gamepads.length; j++) {
            if (!this.gamepads[j]) continue;
            var has = false;
            for (var i=0; i<gamepads.length; i++) {
                if (!gamepads[i]) continue;
                if (this.gamepads[j].index === gamepads[i].index) {
                    has = true;
                }
            }
            if (!has) {
                this.gamepads.splice(j, 1);
                j--;
                if (typeof this.ondisconnected == 'function') {
                    this.ondisconnected();
                }
            }
        }
    },
    on: function(name, cb) {
        this["on"+name.toLowerCase()] = cb;
    }
}


/*
function test() {
    var gamepad;
    try {
        gamepad = new Gamepad();
    } catch(e) {
        console.warn('not supported!', e);
        return;
    }
    gamepad.on('connected', function(e) {
        console.log('connected');
    })
    gamepad.on('disconnected', function(e) {
        console.log('disconnected');
    })
    gamepad.on('axischanged', function(e) {
        console.log('axischanged', e);
    })
    gamepad.on('buttondown', function(e) {
        console.log('buttondown', e);
    })
    gamepad.on('buttonup', function(e) {
        console.log('buttonup', e);
    })
    
}

test();
*/
