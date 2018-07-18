var images = document.querySelectorAll('.slider .sliderContainer img');
var centeredElements = document.getElementsByClassName('centered');
var buttonPrev = document.querySelector('.slider .prev');
var buttonNext = document.querySelector('.slider .next');
var imageIndex = 0;
buttonPrev.onclick = function () {
    images[imageIndex].style.display = 'none';
    centeredElements[imageIndex].style.display = 'none';
    imageIndex--;

    if (imageIndex < 0) {
        imageIndex = images.length - 1;
    }

    images[imageIndex].style.display = 'block';
    centeredElements[imageIndex].style.display = 'block';
}

buttonNext.onclick = function () {
    images[imageIndex].style.display = 'none';
    centeredElements[imageIndex].style.display = 'none';
    imageIndex++;

    if (imageIndex >= images.length) {
        imageIndex = 0;
    }

    images[imageIndex].style.display = 'block';
    centeredElements[imageIndex].style.display = 'block';
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




