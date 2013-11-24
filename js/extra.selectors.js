/*!
 * Extra Selectors - Script fork do jQuery Browser Selector
 * Não depende do jQuery e é mais rápido!
 */
(function(){

    var userAgent = navigator.userAgent.toLowerCase(),
        html = document.getElementsByTagName('html')[0],
        os = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(userAgent),
        ua = /(ie|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);

    var addClass = function(name){
        html.className += ' ' + name;
    };

    addClass(os[1]);

    if( ua ){

        addClass(ua[1]);

        // Fix for Safari
        if(ua[1] == 'safari')
            addClass(ua[1] + '-' + ua[2].substring(0, 1));
        else
            addClass(ua[1] + '-' + parseInt(ua[2]));

        // IE conditional
        if(ua[1] == 'ie'){

            for(var ver = 3; ver < 10; ver++) {
                if(parseInt(ua[2]) < ver)
                    addClass('lt-ie-' + ver);
            }

        }
    }

})();