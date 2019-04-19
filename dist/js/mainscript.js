"use strict";

function mobileMenuResetState() {
  $(".menu__list").addClass("menu__list_hide-fix menu__list_hidden");
}

function toggleMobileMenu() {
  if ($(".menu__list").hasClass("menu__list_hide-fix")) {
    $(".menu__list").removeClass("menu__list_hide-fix");
  }

  $(".menu__list").toggleClass("menu__list_hidden");
}

function toggleSideFeatures() {
  var $sideMenu = $(".side-features");

  if (!$sideMenu.hasClass("side-features_hide_away") && window.pageYOffset > 0) {
    $sideMenu.addClass("side-features_hide_away");
  } else if (window.pageYOffset === 0) {
    $sideMenu.removeClass("side-features_hide_away");
  }
}

function toggleNavbarBgVisibility() {
  var $menu = $(".menu");

  if ($menu.hasClass("menu_transparent") && window.pageYOffset > 0) {
    $menu.removeClass("menu_transparent");
  } else if (window.pageYOffset === 0) {
    $menu.addClass("menu_transparent");
  }
}

function checkScroll() {
  toggleSideFeatures();
  toggleNavbarBgVisibility();
}

$(window).on("resize", function () {
  mobileMenuResetState();
});
$(".menu__toggle-button").click(function () {
  toggleMobileMenu();
});
var defaultScrollAnimOps = {
  duration: 800,
  easing: "easeOutSine"
};
$(".header__start-button").click(function () {
  $("body, html").animate({
    scrollTop: $(".intro").offset().top
  }, defaultScrollAnimOps);
});
$(".menu__logo").click(function () {
  $("body, html").animate({
    scrollTop: 0
  }, defaultScrollAnimOps);
});
$(".menu__link:not([href^='http'])").click(function (e) {
  e.originalEvent.preventDefault();
  var link = $(this).attr("href");
  var scrollTarget = $(".".concat(link));

  if (!scrollTarget) {
    throw new Error("Have no such element");
  }

  $("body, html").animate({
    scrollTop: scrollTarget.offset().top
  }, defaultScrollAnimOps);
  toggleMobileMenu();
});
window.addEventListener("scroll", checkScroll);
checkScroll();