var Alerts = {
    init: function () {
        document.addEventListener('click', function (e) {
            var close = e.target.closest('.close');
            var alert = e.target.closest('.alert');
            if (close && alert) {
                alert.remove();
                e.preventDefault();
            }
        });
    }
};
Alerts.init();
