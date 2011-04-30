(function () {

// install intercept
(function () {
    var timer_id = setTimeout(function() {
        if (timer_id) clearTimeout(timer_id);
        if (typeof toggle_pin != 'undefined') {
            window._toggle_pin = window.toggle_pin;
            window.toggle_pin = pin;
        } else {
            timer_id = setTimeout(arguments.callee, 100);
        }
    }, 0);
})();

function obj2query(obj) {
    var q = '';
    for (var k in obj) {
        q += encodeURIComponent(k);
        q += '=';
        q += encodeURIComponent(obj[k]);
        q += '&';
    }
    return q;
}

function pin(item_id) {
    try {
        var item = get_active_item(true);
        if(!item) return;

        var pin_button = $("pin_" + item_id);
        var item = $("item_" + item_id);
        var a = item.getElementsByTagName("a");
        if(!a.length) return;
        var title = a[0].innerHTML;
        var url   = a[0].href;

        // feed info
        var info = subs_item(State.now_reading);

        var data = {
            v: 1,
            h: '141d',
            u: url,
            t: info.folder + ' | ' + title,
            rand: Math.random()
        };
        var url = 'http://readitlaterlist.com/v2/r.gif?' + obj2query(data);

        var img = new Image();
        img.src = url;
        img.addEventListener('load', function () {
            if (img.width == 2 || img.width == 3) {
                alert('You are not logged in.  Please log in before saving links to Read It Later');
                return;
            }

            pin_button && addClass(pin_button, "pin_active");
            addClass(item, "pinned");

            document.body.removeChild(img);
        }, false);
        document.body.appendChild(img);
    }
    catch (e) {
        console.log(e);
    }
}

})();
