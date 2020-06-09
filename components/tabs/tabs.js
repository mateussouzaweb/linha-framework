var Tabs = {
    init: function () {
        var self = this;
        document.addEventListener('click', function (e) {
            var tabs = e.target.closest('ul.tabs');
            var li = e.target.closest('li');
            if (tabs && li) {
                self.activate(tabs, li.dataset.tabId);
                e.preventDefault();
            }
        });
    },
    activate: function (element, tabId) {
        var current = element.querySelector('li.active');
        var currentId = null;
        var currentTab = null;
        var next = element.querySelector('li[data-tab-id="' + tabId + '"]');
        var nextTab = document.querySelector('[data-tab="' + tabId + '"]');
        if (current) {
            current.classList.remove('active');
            currentId = current.dataset.tabId;
            currentTab = document.querySelector('[data-tab="' + currentId + '"]');
        }
        if (currentTab) {
            currentTab.classList.remove('active');
        }
        if (next) {
            next.classList.add('active');
        }
        if (nextTab) {
            nextTab.classList.add('active');
        }
    }
};
Tabs.init();
