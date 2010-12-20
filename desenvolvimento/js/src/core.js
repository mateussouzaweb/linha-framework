/**
 * jQuery Browser Selectors - 1.1
 * http://github.com/mateus007/jQuery-Browser-Selector
 */
(function(a){a.browserSelector=function(){var b,c="undefined",d=navigator.userAgent.toLowerCase();if(a.browser.msie){b="ie";c="ie-"+a.browser.version.substring(0,1)}if(a.browser.opera){b="opera";c="opera-"+parseInt(a.browser.version)}if(a.browser.mozilla)if(navigator.userAgent.toLowerCase().indexOf("firefox")!=-1){b="firefox";v=d.substring(d.indexOf("firefox/")+8);v=v.substring(0,1);c="firefox-"+v}else b="mozilla";if(a.browser.webkit){if(/chrome/.test(navigator.userAgent.toLowerCase())){b="chrome";
c="chrome-"}else{b="safari";c="safari-"}v=d.substring(d.indexOf(b+"/")+7);v=v.substring(0,1);c+=v}a("html").addClass(b+" "+c)};a.browserSelector()})(jQuery);