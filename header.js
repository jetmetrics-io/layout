(function () {
  var trigger = document.querySelector(".jm-nav-dropdown-trigger");
  var menu = document.getElementById("jm-nav-hub-menu");
  var dropdown = document.getElementById("jm-nav-hub");

  if (trigger && menu && dropdown) {
    function closeMenu() {
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }
    function openMenu() {
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
    }
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      if (menu.hidden) openMenu(); else closeMenu();
    });
    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  var burger = document.getElementById("jm-header-burger");
  var mobile = document.getElementById("jm-header-mobile");
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      var isOpen = !mobile.hidden;
      mobile.hidden = isOpen;
      burger.setAttribute("aria-expanded", String(!isOpen));
    });
  }
})();
