"use client"
import React, { useState } from 'react'
import Modal from './Modal'
import useSubscriptionModalHook from '@/hooks/useSubscriptionModalHook';
import { useGetUserHook } from '@/hooks/useGetUserHook';
import { Price, ProductWithPrice } from '@/types/types-custom';
import toast from 'react-hot-toast';
import { postData } from '@/libs/helpers';
import { getStripe } from '@/libs/stripeClient';
import Button from './Button';

interface SubscriptionModalProps {
    products: ProductWithPrice[];
  }
  
  const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
      minimumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100);
  
    return priceString;
  };

const SubscriptionModal = ({products}:SubscriptionModalProps) => {
    const subscribeModal = useSubscriptionModalHook();
    const { user, isLoading, subscription } = useGetUserHook();
  
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
  
    const onChange = (open: boolean) => {
      if (!open) {
        subscribeModal.onClose();
      }
    }
  
    const handleCheckout = async (price: Price) => {
      setPriceIdLoading(price.id);
      if (!user) {
        setPriceIdLoading(undefined);
        return toast.error('Must be logged in');
      }
  
      if (subscription) {
        setPriceIdLoading(undefined);
        return toast('Already subscribed');
      }
  
      try {
        const { sessionId } = await postData({
          url: '/api/create-checkout-session',
          data: { price }
        });
  
        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
      } catch (error) {
        return toast.error((error as Error)?.message);
      } finally {
        setPriceIdLoading(undefined);
      }
    };
  
    let content = (
      <div className="text-center">
        No products available.
      </div>
    )
  
    if (products.length) {
      content = (
        <div>
          {products.map((product) => {
            if (!product.prices?.length) {
              return (
                <div key={product.id}>
                  No prices available
                </div>
              );
            }
  
            return product.prices.map((price) => (
              <Button 
                key={price.id} 
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.id === priceIdLoading}
                className="mb-4"
              >
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </Button>
            ))
          })}
        </div>
      )
    }
  
    if (subscription) {
      content = (
        <div className="text-center">
          Already subscribed.
        </div>
      )
    }
  
    return (
      <Modal
        title="Only for premium users"
        description="Listen to music with Spotify Premium"
        isOpen={subscribeModal.isOpen}
        onChange={onChange}
      >
        {content}
      </Modal>
    );
}

export default SubscriptionModal