var images = document.querySelectorAll('.slider .sliderContainer img');
var centeredElements = document.getElementsByClassName('centered');
var buttonPrev = document.querySelector('.slider .prev');
var buttonNext = document.querySelector('.slider .next');
var i = 0;
buttonPrev.onclick = function () {
    images[i].style.display = 'none';
    centeredElements[i].style.display = 'none';
    i--;

    if (i < 0) {
        i = images.length - 1;
    }

    images[i].style.display = 'block';
    centeredElements[i].style.display = 'block';
}

buttonNext.onclick = function () {
    images[i].style.display = 'none';
    centeredElements[i].style.display = 'none';
    i++;

    if (i >= images.length) {
        i = 0;
    }

    images[i].style.display = 'block';
    centeredElements[i].style.display = 'block';
};

// toggle animation

var toggleSearchContentElem = document.getElementById("contentSearchOption");

document.getElementById("contentSearch").addEventListener('click', function() {
    if (isVisible(toggleSearchContentElem)) {
        fadeOut(toggleSearchContentElem);
    }else {
        fadeIn(toggleSearchContentElem);
    }
});

function fadeOut(elem) {
    var handler = function() {
        elem.style.display = "none";
        elem.classList.remove("hide");
        elem.removeEventListener('transitionend', handler);
    };

    elem.classList.add("hide");
    elem.addEventListener('transitionend', handler);
}

function fadeIn(elem) {
    var handler = function() {
        elem.classList.remove("active");
        elem.removeEventListener('transitionend', handler);
    };

    elem.style.display = "block";
    elem.classList.add("preActive");

    raf(function() {
        elem.classList.add("active");
        elem.classList.remove("preActive");
    });

    elem.addEventListener('transitionend', handler);
}
function isVisible(elem) {
    var elemCurrentStyle = getComputedStyle(elem);
    return elemCurrentStyle.display === "block";
}

function raf(fn) {
    window.requestAnimationFrame(function() {
        window.requestAnimationFrame(function() {
            fn();
        });
    });
}




