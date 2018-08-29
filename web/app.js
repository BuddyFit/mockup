
window.addEventListener('load', function () {

    var title = document.getElementById('title');
    var image = document.getElementById('image');
    var links = document.getElementById('links');

    var request = new XMLHttpRequest();
    request.open("GET", "views.json", false);
    request.send(null);

    var views = JSON.parse(request.response);

    function setView(view) {

        image.src = view.image
        title.innerHTML = view.title;
        links.innerHTML = '';

        for (var i = 0; i < view.links.length; i++) {

            var link = view.links[i];
            var div = document.createElement('div');
            let href = new String(link.href)

            div.className = 'link';
            div.style.width = link.width + 'px';
            div.style.height = link.height + 'px';
            div.style.left = link.x + 'px';
            div.style.top = link.y + 'px';

            div.onclick = function () {

                window.location.hash = href
                setView(views[href])
            }

            links.appendChild(div);
        }
    }

    function load() {

        var href = window.location.hash.slice(1) || 'signin'
        console.log(href)
        window.location.hash = href

        setView(views[href])
    }

    window.addEventListener('popstate', function () {

        load()
    })

    load()
})