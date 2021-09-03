$(document).ready(function () {
  $(".knopke").click(function () {
    $(".menu").toggleClass("nav-open");
  });

  $(".social a:last-child").click(function () {
    $(".popup").toggleClass("cart-open");
  });
  $(".popup button").click(function () {
    $(".popup").removeClass("cart-open");
  });

  const sectionHeroEl = document.querySelector(".sales-grid");

  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      console.log(ent);
      if (ent.isIntersecting === true) {
        document.body.classList.add("sticky");
      }
      if (ent.isIntersecting === false) {
        document.body.classList.remove("sticky");
      }
    },
    {
      // in the viewport
      root: null,
      threshold: 0,
    }
  );
  obs.observe(sectionHeroEl);
});
