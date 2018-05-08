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
        burger: document.querySelector('.mobileBurger'),
        bag: document.querySelector('.headerIcons__btn.icon-bag'),
        cartList: document.querySelector('.cart__list'),
        cartRemove: document.querySelectorAll('.cart__remove')
    },

    options: {

    },

    setup: function () {

        this.initSlider();

    },

    events: function () {

        this.selectors.burger.addEventListener('click', () => {
            this.toggleBodyClass('nav-open');
        });

        this.selectors.bag.addEventListener('click', () => {
            this.toggleBodyClass('bag-open');
        });

        const cartRemove = this.selectors.cartRemove;

        for(var i = 0; i < cartRemove.length; i++) {
            cartRemove[i].addEventListener('click', this.removeCartItem);

        }

    },

    toggleBodyClass: function(bodyClass) {
        const body = this.selectors.body;

        if(body.classList.contains(bodyClass)) {
            body.classList.remove(bodyClass);
        } else {
            body.classList.add(bodyClass);
        }
    },

    removeCartItem: function() {

        const cartItem = this.parentNode;

        cartItem.classList.add('remove');

        cartItem.addEventListener('transitionend', () => {
            cartItem.style.display = 'none';
        }, false);

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