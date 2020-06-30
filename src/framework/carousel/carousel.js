var Carousel = {
    userEvent: true,
    init: function () {
        var self = this;
        var timer = null;
        var parent = null;
        document.addEventListener('click', function (e) {
            var next = e.target.closest('.next');
            var previous = e.target.closest('.previous');
            var element = e.target.closest('.carousel');
            if (next && element) {
                e.preventDefault();
                self.move(element, 'next');
            }
            if (previous && element) {
                e.preventDefault();
                self.move(element, 'previous');
            }
        });
        document.addEventListener('scroll', function (e) {
            if (!self.userEvent || e.target === document) {
                return;
            }
            var scroll = e.target.closest('.scroll');
            if (!scroll) {
                return;
            }
            parent = scroll.closest('.carousel');
            if (timer) {
                window.clearInterval(timer);
            }
            timer = window.setTimeout(function () {
                self.move(parent, 'current');
            }, 100);
        }, true);
        window.addEventListener('resize', function () {
            var items = document.querySelectorAll('.carousel');
            [].forEach.call(items, function (item) {
                self.move(item, 'current');
            });
        });
    },
    move: function (element, direction) {
        var scroll = element.querySelector('.scroll');
        var items = element.querySelectorAll('.item');
        if (!items.length) {
            return;
        }
        var itemWidth = items[0].offsetWidth;
        var perPage = scroll.clientWidth / itemWidth;
        perPage = Math.round(perPage);
        var current = (scroll.scrollLeft / itemWidth) + 1;
        current = Math.round(current);
        var count = items.length;
        var append = count % perPage;
        var next;
        if (direction == 'next') {
            next = current + perPage;
            if (!append && next > count) {
                next = 1;
            }
            else if (append && next >= count) {
                if (current + append < count) {
                    next = current + append;
                }
                else {
                    next = 1;
                }
            }
        }
        else if (direction == 'previous') {
            next = current - perPage;
            if (!append && next <= 0) {
                next = count;
            }
            else if (append && next <= 0) {
                if (current - append > 0) {
                    next = current - append;
                }
                else {
                    next = count;
                }
            }
        }
        else {
            next = current;
        }
        this.userEvent = false;
        scroll.scrollLeft = (next - 1) * itemWidth;
        this.userEvent = true;
    }
};
Carousel.init();
