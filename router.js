// getElementById wrapper
function $id(id) {
    return document.getElementById(id);
};
// asyncrhonously fetch the html template partial from the file directory,
// then set its contents to the html of the parent element
function loadHTML(url, id) {
    req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();
    req.onload = () => {
        $id(id).innerHTML = req.responseText;
    };
}

var router = new Navigo(null, true, '#!');

router.on({
    // 'view' is the id of the div element inside which we render the HTML
    'root_page': () => { loadHTML('main.html', 'wrap'); },
    'about_us': () => { loadHTML('about_us/about_us.html', 'wrap'); },
    'contact_us': () => { loadHTML('contact_us/contact_us.html', 'wrap'); }
});

router.resolve();

