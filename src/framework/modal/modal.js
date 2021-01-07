var Modal = {
    animationTime: 150,
    init: function () {
        var self = this;
        document.addEventListener('click', function (e) {
            var link = e.target.closest('[data-modal]');
            var close = e.target.closest('.close');
            var backdrop = e.target.closest('.backdrop');
            var modal = e.target.closest('.modal');
            if (link) {
                modal = document.querySelector(link.dataset.modal);
            }
            if (!modal) {
                return;
            }
            if (close || backdrop) {
                e.preventDefault();
                self.hide(modal);
            }
            else if (link) {
                e.preventDefault();
                self.show(modal);
            }
        });
    },
    show: function (element) {
        var self = this;
        var body = document.body;
        body.classList.add('modal-open');
        element.classList.remove('hidden');
        element.classList.add('visible');
        window.setTimeout(function () {
            element.classList.add('in');
        }, self.animationTime);
    },
    hide: function (element) {
        var self = this;
        var body = document.body;
        body.classList.remove('modal-open');
        element.classList.remove('in');
        window.setTimeout(function () {
            element.classList.remove('visible');
            element.classList.add('hidden');
        }, self.animationTime);
    }
};
Modal.init();
