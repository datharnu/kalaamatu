"use client";
import { useCart } from "@/app/context/cart-context";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [deliveryZones, setDeliveryZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  React.useEffect(() => {
    const fetchZones = async () => {
      try {
        const res = await api.get('/delivery-zones');
        setDeliveryZones(res.data);
      } catch (error) {
        console.error('Failed to fetch delivery zones:', error);
      }
    };
    fetchZones();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = selectedZone ? parseFloat(selectedZone.price) : 0;
  const total = subtotal + shipping;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!selectedZone) {
        alert("Please select a delivery method");
        setIsSubmitting(false);
        return;
      }

      const orderData = {
        ...formData,
        customerName: `${formData.firstName} ${formData.lastName}`,
        items: cart.map(item => ({
          id: item.id,
          quantity: item.quantity,
        })),
        deliveryZone: selectedZone.name,
        shippingFee: selectedZone.price
      };

      await api.post('/orders', orderData);

      clearCart();
      alert("Order placed successfully!");
      router.push('/');
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(error.response?.data?.error || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="mx-4 md:mx-12 max-w-screen-xl lg:mx-auto py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-medium mb-4 text-[rgba(var(--color-foreground),1)]">
          Your cart is empty
        </h2>
        <p className="text-[rgba(var(--color-foreground),0.7)] mb-8">
          Add some items to your cart before checking out.
        </p>
        <Link href="/shop">
          <Button className="bg-[rgba(var(--color-foreground),1)] text-[rgba(var(--color-background),1)] hover:opacity-90">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-4 md:mx-12 max-w-screen-xl lg:mx-auto py-8 lg:py-16">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 mb-8 text-[rgba(var(--color-foreground),0.7)] hover:text-[rgba(var(--color-foreground),1)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm tracking-wide">Back to cart</span>
      </Link>

      <h1 className="text-3xl md:text-4xl font-medium mb-8 text-[rgba(var(--color-foreground),1)]">
        Checkout
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="border border-[rgba(var(--color-foreground),0.1)] rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-medium text-[rgba(var(--color-foreground),1)]">
                Contact Information
              </h2>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border-[rgba(var(--color-foreground),0.2)]"
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="border-[rgba(var(--color-foreground),0.2)]"
              />
            </div>

            {/* Shipping Address */}
            <div className="border border-[rgba(var(--color-foreground),0.1)] rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-medium text-[rgba(var(--color-foreground),1)]">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="border-[rgba(var(--color-foreground),0.2)]"
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="border-[rgba(var(--color-foreground),0.2)]"
                />
              </div>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="border-[rgba(var(--color-foreground),0.2)]"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="border-[rgba(var(--color-foreground),0.2)]"
                />
                <Input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  className="border-[rgba(var(--color-foreground),0.2)]"
                />
              </div>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-[rgba(var(--color-foreground),0.2)] rounded-md bg-transparent text-[rgba(var(--color-foreground),1)]"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="NG">Nigeria</option>
              </select>
            </div>

            {/* Delivery Method */}
            <div className="border border-[rgba(var(--color-foreground),0.1)] rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-medium text-[rgba(var(--color-foreground),1)]">
                Delivery Method
              </h2>
              <div className="space-y-3">
                {deliveryZones.map((zone) => (
                  <label
                    key={zone.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${selectedZone?.id === zone.id
                      ? "border-[rgba(var(--color-foreground),1)] bg-[rgba(var(--color-foreground),0.05)]"
                      : "border-[rgba(var(--color-foreground),0.2)] hover:border-[rgba(var(--color-foreground),0.5)]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryZone"
                        value={zone.id}
                        checked={selectedZone?.id === zone.id}
                        onChange={() => setSelectedZone(zone)}
                        className="w-4 h-4 text-[rgba(var(--color-foreground),1)] focus:ring-[rgba(var(--color-foreground),1)]"
                      />
                      <span className="font-medium text-[rgba(var(--color-foreground),1)]">
                        {zone.name}
                      </span>
                    </div>
                    <span className="font-semibold text-[rgba(var(--color-foreground),1)]">
                      {formatPrice(zone.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Information - Bank Transfer */}
            <div className="border border-[rgba(var(--color-foreground),0.1)] rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-[rgba(var(--color-foreground),0.7)]" />
                <h2 className="text-xl font-medium text-[rgba(var(--color-foreground),1)]">
                  Payment Method: Bank Transfer
                </h2>
              </div>

              <div className="bg-gray-50 p-4 rounded-md border border-[rgba(var(--color-foreground),0.1)] space-y-3">
                <p className="text-sm text-black">
                  Please make a transfer to the account below and click "Place Order".
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-black">Bank Name:</span>
                    <span className="font-semibold text-black">GTBank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-black">Account Name:</span>
                    <span className="font-semibold text-black">Kalaamatu</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-black">Account Number:</span>
                    <span className="font-mono font-bold text-lg text-black tracking-wider">0123456789</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-[rgba(var(--color-foreground),0.7)] bg-blue-50 p-3 rounded text-blue-700">
                <Lock className="w-4 h-4" />
                <span>Your order will be processed once payment is confirmed.</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 border border-[rgba(var(--color-foreground),0.1)] rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-medium text-[rgba(var(--color-foreground),1)]">
                Order Summary
              </h2>

              {/* Cart Items Preview */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[rgba(var(--color-foreground),0.7)]">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="text-[rgba(var(--color-foreground),1)]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-[rgba(var(--color-foreground),0.1)]">
                <div className="flex justify-between text-[rgba(var(--color-foreground),0.7)]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[rgba(var(--color-foreground),0.7)]">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <hr className="border-[rgba(var(--color-foreground),0.1)]" />
                <div className="flex justify-between text-lg font-semibold text-[rgba(var(--color-foreground),1)]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 text-lg font-medium tracking-wide bg-[rgba(var(--color-foreground),1)] text-[rgba(var(--color-background),1)] hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


