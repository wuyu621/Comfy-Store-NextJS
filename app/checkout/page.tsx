"use client";
import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import axios from "axios";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function CheckoutPage() {
  const searchParams = useSearchParams();
  const cartId = searchParams.get("cartId");
  const orderId = searchParams.get("orderId");

  const fetchClientSecret = useCallback(async () => {
    const response = await axios.post("/api/payment", {
      orderId: orderId,
      cartId: cartId,
    });
    return response.data.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default CheckoutPage;
