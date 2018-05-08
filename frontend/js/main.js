const data = require('./data');

var tools = {

    debug: true,

    log: function () {
        if (this.debug) {
            for (var i = 0; i < arguments.length; i++) {
                console.log(arguments[i]);
            }
        }
    },

    init: function (debug) {

        this.debug = (debug) ? debug : false;

        this.setup();

        this.events();

    },

    selectors: {


    },

    options: {

    },

    setup: function () {

    },

    events: function () {

    }

}

window.tools = tools;

document.addEventListener('DOMContentLoaded', function () {

    tools.init(true);

});