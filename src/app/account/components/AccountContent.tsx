"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


import Button from "@/components/Button";

import { postData } from "@/libs/helpers";
import useSubscriptionModalHook from "@/hooks/useSubscriptionModalHook";
import { useGetUserHook } from "@/hooks/useGetUserHook";
import toast from "react-hot-toast";

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscriptionModalHook();
  const { isLoading, subscription, user } = useGetUserHook();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link'
      });
      window.location.assign(url);
    } catch (error) {
      if (error) return toast.error((error as Error).message);
    }
    setLoading(false);
  };

  return ( 
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
        <p>No active plan.</p>
        <Button 
          onClick={subscribeModal.onOpen}
          className="w-[300px]"
        >
          Subscribe
        </Button>
      </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>You are currently on the 
            <b> {subscription?.prices?.products?.name} </b> 
            plan.
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
}
 
export default AccountContent;