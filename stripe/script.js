const stripe = Stripe(
  "pk_test_51IXpoDCuIuoRhTfFzHWukRqQiPLnTNeB9S3srQacgoaSN5sZBQ6Lj6dPLyZjgri9iKipoDnV3TpV7ydW5ID7u3vk00sVs0lpQi"
);
const btn = document.querySelector(".basket-btn");
btn.addEventListener("click", () => {
  fetch("/php/PROJEKTAS/stripe/checkout.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((payload) => {
      stripe.redirectToCheckout({ sessionId: payload.id });
    });

  console.log("ok");
});
