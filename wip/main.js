// フォント読み込み 
(function (d) {
    var config = {
        kitId: 'bgh3yko',
        scriptTimeout: 3000,
        async: true
    },
        h = d.documentElement, t = setTimeout(function () {
            h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
        },
            config.scriptTimeout),
        tk = d.createElement("script"),
        f = false,
        s = d.getElementsByTagName("script")[0],
        a; h.className += " wf-loading";
    tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
    tk.async = true;
    tk.onload = tk.onreadystatechange = function () {
        a = this.readyState;
        if (f || a && a != "complete" && a != "loaded") return;
        f = true;
        clearTimeout(t);
        try { Typekit.load(config) } catch (e) { }
    };
    s.parentNode.insertBefore(tk, s)
})(document);

//トグルスイッチoff
function uncheckCheckbox() {
    var checkbox = document.getElementById("drawer_input");
    if (checkbox.checked) {
        checkbox.checked = false;
    }
}

//オーバーレイ
document.addEventListener('DOMContentLoaded', function () {

    // オーバーレイを開閉する関数
    function overlayToggle(overlay) {
        overlay.classList.toggle('overlay-on');
    }

    // 指定した要素に対して上記関数を実行するクリックイベントを設定
    const openBtn1 = document.getElementById('open-btn-1');
    const closeBtn1 = document.getElementById('close-btn-1');
    const overlay1 = document.getElementById('overlay-1');

    openBtn1.addEventListener('click', function () {
        overlayToggle(overlay1);
    }, false);

    closeBtn1.addEventListener('click', function () {
        overlayToggle(overlay1);
    }, false);
    overlay1.addEventListener('click', function () {
        overlayToggle(overlay1);
    }, false);

    const openBtn2 = document.getElementById('open-btn-2');
    const closeBtn2 = document.getElementById('close-btn-2');
    const overlay2 = document.getElementById('overlay-2');

    openBtn2.addEventListener('click', function () {
        overlayToggle(overlay2);
    }, false);

    closeBtn2.addEventListener('click', function () {
        overlayToggle(overlay2);
    }, false);
    overlay2.addEventListener('click', function () {
        overlayToggle(overlay2);
    }, false);

    // イベントに対してバブリングを停止
    function stopEvent(event) {
        event.stopPropagation();
    }

    const overlayInner1 = document.getElementById('overlay-inner-1');
    overlayInner1.addEventListener('click', stopEvent, false);

    const overlayInner2 = document.getElementById('overlay-inner-2');
    overlayInner2.addEventListener('click', stopEvent, false);

}, false);

//カルーセル
document.write('<script src="./dist/js/swiper.js"></script>');

window.onload = function(){
	var swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true
        },
        //effect: "coverflow",
        speed: 1500,
    });
}