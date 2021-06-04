// Get current year
var date = new Date();
var year = date.getFullYear();
document.getElementById("copyYear").innerHTML = year;

/*Function to change navigation appearance on scroll*/
var scrollNav = document.getElementById("navi");
var scrollNavLinks = document.getElementById("navLinks");
var bars = document.getElementById("menuBars");

window.onload = function () {
    'use strict';
    if (window.innerWidth < 850) {
        scrollNav.classList.add("navTopMenu");
    }
};

window.onscroll = function () {
    'use strict';
    if (document.body.scrollTop >= window.innerHeight || document.documentElement.scrollTop >= window.innerHeight) {
        $(".navbar a").css({color: "var(--textColor)"});
        scrollNav.classList.add("navigationScroll");
        scrollNav.classList.remove("navTopMenu");
        scrollNavLinks.classList.add("onNavColor");
        bars.classList.add("onNavColor");
        document.getElementById("backToTop").classList.remove("hide");
    } else if (document.documentElement.scrollTop > 20 && document.documentElement.scrollTop < window.screen.height) {
        $(".navbar a").css({color: "#FFF"});
        scrollNav.classList.add("navTopMenu");
        document.getElementById("backToTop").classList.add("hide");
    } else {
        scrollNav.classList.remove("navigationScroll");
        scrollNav.classList.remove("navTopMenu");
        scrollNavLinks.classList.remove("onNavColor");
        bars.classList.remove("onNavColor");
        document.getElementById("backToTop").classList.add("hide");
    }
    
    if (window.innerWidth < 850 && document.documentElement.scrollTop < window.screen.height) {
        scrollNav.classList.add("navTopMenu");
    }
    
    
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && window.innerWidth <= 880) {
        $(".toTop a .fas").css({ border: "2px solid var(--markColor)"});
    } else {
        $(".toTop a .fas").css({ border: "2px solid var(--textColor)"});
    }
};

function backTop() {
    'use strict';
    if (document.body.scrollTop < 300 || document.documentElement.scrollTop < 300) {
        document.getElementById("backToTop").classList.add("hide");
    }
}

function showMenu() {
    'use strict';
    var x = document.getElementById("navLinksResponsive");
    if (x.className === "navbarResponsive") {
        x.className += " responsive";
    } else {
        x.className = "navbarResponsive";
    }
}

function closeOpenedMenu() {
    'use strict';
    document.getElementById("navLinksResponsive").classList.add("closeOpenMenu");
}

// Smooth Scroll into View -> Source : https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Checks for touch device
if(!!('ontouchstart' in window)){
    $(".projectOptions").css({
        opacity: .8,
        visibility: "visible",
    });
    
    $(".projectImage").css({
        opacity: .8,
        filter: "blur(1px)",
    });
}

// Add default text for not ready projects
var htmlLocation = String(window.location).split("/");
var htmlFileName = htmlLocation[htmlLocation.length - 1]; 
var emptyProjectText;

if (htmlFileName == "index.html"){
    emptyProjectText = "Project information coming soon...";
} else if (htmlFileName == "index_el.html"){
    emptyProjectText = "Προσθήκη περιγραφής σύντομα...";
    $(".scientificInterests").css("padding", "2em");
}

$(document).ready(function() { 
    $(".projectInfo p:empty").css({ margin: "2em 0em"})
    $(".projectInfo p:empty").text(emptyProjectText);
});