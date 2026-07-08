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

  // TEMPORARY diagnostic: rule out native browser link-drag ghost preview
  // as the cause of the account button visually "growing" on click-hold.
  [document.getElementById("jm-header-login"), document.getElementById("jm-header-mobile-login")].forEach(function (btn) {
    if (btn) btn.draggable = false;
  });

  // Tilda Members writes a localStorage key shaped like
  // tilda_members_profile{projectId} once a visitor logs in. Checking by
  // prefix avoids hardcoding the numeric project id.
  var isMember = Object.keys(localStorage).some(function (key) {
    return key.indexOf("tilda_members_profile") === 0;
  });
  if (isMember) {
    [document.getElementById("jm-header-login"), document.getElementById("jm-header-mobile-login")].forEach(function (btn) {
      if (!btn) return;
      btn.textContent = "Личный кабинет";
      btn.href = "https://джетметрикс.рф/hub";
    });

    function logout(e) {
      e.preventDefault();
      Object.keys(localStorage)
        .filter(function (key) { return key.indexOf("tilda_members_profile") === 0; })
        .forEach(function (key) { localStorage.removeItem(key); });
      window.location.reload();
    }
    [document.getElementById("jm-header-logout"), document.getElementById("jm-header-mobile-logout")].forEach(function (link) {
      if (!link) return;
      link.hidden = false;
      link.addEventListener("click", logout);
    });
  }

  // TEMPORARY diagnostic: rule out password-manager / native autofill
  // heuristics keyed off "login" in text, id, or href. Runs last so it
  // wins over the isMember block above regardless of login state.
  [document.getElementById("jm-header-login"), document.getElementById("jm-header-mobile-login")].forEach(function (btn) {
    if (!btn) return;
    btn.textContent = "Тест123";
    btn.id = "zz-neutral-" + Math.random().toString(36).slice(2);
    btn.href = "https://джетметрикс.рф/zz-test-neutral";
    btn.setAttribute("autocomplete", "off");
  });

  // Tilda's own userbar widget (.tlk-userbar) sets its display via an
  // inline style from its own script, which beats a plain CSS rule. Force
  // it hidden via JS instead, and keep re-forcing it: Tilda's script may
  // re-apply the inline style later (e.g. on resize, or after member data
  // loads), so a one-time hide on page load isn't reliable.
  function hideNativeUserbar() {
    document.querySelectorAll(".tlk-userbar").forEach(function (el) {
      el.style.setProperty("display", "none", "important");
    });
  }
  hideNativeUserbar();
  new MutationObserver(hideNativeUserbar).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class"],
  });

  var header = document.getElementById("jm-header");
  if (header) {
    function updateScrollShadow() {
      if (window.scrollY > 4) {
        header.classList.add("jm-header--scrolled");
      } else {
        header.classList.remove("jm-header--scrolled");
      }
    }
    window.addEventListener("scroll", updateScrollShadow, { passive: true });
    updateScrollShadow();
  }
})();
