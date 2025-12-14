let cart = [];
let totalAmount = 0;

// Add item to cart
function addToCart(name, price) {
  cart.push({ name, price });
  totalAmount += price;
  updateCart();
}

// Update cart UI
function updateCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  cart.forEach((item, index) => {
    cartDiv.innerHTML += `<p>${index + 1}. ${item.name} - ₹${item.price}</p>`;
  });

  document.getElementById("total").innerText = totalAmount;
}

// Checkout & Razorpay payment
async function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  try {
    const response = await fetch("/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount })
    });

    const order = await response.json();

    const options = {
      key: "rzp_test_RrCMkeS4VaZXJq", // 🔴 PUT YOUR TEST KEY HERE
      amount: order.amount,
      currency: "INR",
      name: "Cleaning Store",
      description: "Cart Checkout",
      order_id: order.id,

      
      handler: async function (response) {
  const paymentId = response.razorpay_payment_id;

  await fetch("/save-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      paymentId: paymentId,
      amount: totalAmount,
      products: cart
    })
  });

  cart = [];
  totalAmount = 0;

  window.location.href =
    `/success.html?payment_id=${paymentId}&amount=${totalAmount}`;
}
,

      theme: {
        color: "#28a745"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
    alert("Payment failed");
  }
}
