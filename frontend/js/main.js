const tns = require('./libs/tiny-slider');

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
        body: document.querySelector('body'),
        burger: document.querySelector('.mobileBurger')
    },

    options: {

    },

    setup: function () {

        this.initSlider();

    },

    events: function () {

        this.selectors.burger.addEventListener('click', this.toggleNav.bind(this), false);

    },

    toggleNav: function(e) {
        e.preventDefault();

        const body = this.selectors.body;

        if(body.classList.contains('nav-open')) {
            body.classList.remove('nav-open');
        } else {
            body.classList.add('nav-open');
        }
    },

    initSlider: function() {

        const slider = tns({
            container: '.my-slider',
            items: 1,
            slideBy: 'page',
            autoplay: true,
            speed: 600,
            autoplayTimeout: 5000,
            autoplayButton: false,
            autoplayButtonOutput: false
        });

    }

}

window.tools = tools;

document.addEventListener('DOMContentLoaded', function () {

    tools.init(true);

});