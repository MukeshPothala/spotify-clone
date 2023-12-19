"use client";
import AuthModal from "@/components/AuthModal";
import Modal from "@/components/Modal";
import UploadModal from "@/components/UploadModal";
import SubscriptionModal from "@/components/SubscriptionModal";
import React, { useEffect, useState } from "react";
import { ProductWithPrice } from "@/types/types-custom";

const ModalProvider = ({products}:{products:ProductWithPrice[]}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscriptionModal products={products} />
    </>
  );
};

export default ModalProvider;
