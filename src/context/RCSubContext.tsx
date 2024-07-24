

import React, { createContext, useEffect, useState, useContext, useRef } from "react";
import Purchases, {
  CustomerInfo,
  LOG_LEVEL,
  MakePurchaseResult,
  PurchasesOffering,
  PurchasesPackage,
  PurchasesStoreTransaction,
} from "react-native-purchases";
import { Platform } from "react-native";
import auth from "@react-native-firebase/auth";
import analytics from '@react-native-firebase/analytics'

export type PurchasesContextProps = {
  currentOffering: PurchasesOffering | null;
  purchasePackage: (
    packageToPurchase: PurchasesPackage,
    event: string
  ) => Promise<MakePurchaseResult>;
  customerInfo?: CustomerInfo;
  isSubscribed: boolean;
  initialized: boolean;
  getNonSubscriptionPurchase: (
    identifier: string
  ) => Promise<PurchasesStoreTransaction | null | undefined>;
};

export const PurchasesContext = createContext<PurchasesContextProps | undefined>(undefined);

type SubscriptionProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const androidApiKey = "goo___________";
const iosApiKey = "-------------";

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
}) => {
  const [initialized, setInitialized] = useState(false);
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>();
  const eventRef = useRef<string>("")

  const init = async () => {
    Purchases.configure({
      apiKey: Platform.OS === "android" ? androidApiKey : iosApiKey,
      appUserID: auth().currentUser?.uid
    });

    if (__DEV__) {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    }

    await getOfferings();

    Purchases.addCustomerInfoUpdateListener((customerInfo) => {
      if(eventRef.current) analytics().logEvent(eventRef.current);
      setCustomerInfo(customerInfo);
    });

    setInitialized(true);
  };

  const getOfferings = async () => {
    const offerings = await Purchases.getOfferings();
    const currentOffering = offerings.current;
    setOffering(currentOffering);
  };

  const purchasePackage = async (purchasedPackage: PurchasesPackage, event:string) => {
    eventRef.current = event
    const result = await Purchases.purchasePackage(purchasedPackage);
    return result;
  };

  const getCustomerInfo = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    setCustomerInfo(customerInfo);
  };

  const checkIfUserIsSubscribed = async () => {
    if (!initialized || !customerInfo) return;
    const isPro = customerInfo.activeSubscriptions.length > 0;
    setIsSubscribed(isPro);
  };

  const getNonSubscriptionPurchase = async (identifier: string) => {
    if (!initialized || !customerInfo) return null;

    const item = customerInfo.nonSubscriptionTransactions.find(
      (t) => t.productIdentifier === identifier
    );

    return item;
  };

  useEffect(() => {
    init();
    getCustomerInfo();
  }, []);

  useEffect(() => {
    checkIfUserIsSubscribed();
  }, [initialized, customerInfo]);

  if (!initialized) {
    return null;
  }

  const value: PurchasesContextProps = {
    currentOffering: offering,
    purchasePackage,
    customerInfo,
    isSubscribed,
    getNonSubscriptionPurchase,
    initialized,
  }

  return (
    <PurchasesContext.Provider value={value} >
      {children}
    </PurchasesContext.Provider>
  );
};

export const usePurchases = (): PurchasesContextProps => {
  const context = useContext(PurchasesContext);
  if (context === undefined) {
      throw new Error('usePurchases must be used within a SubscriptionProvider');
  }
  return context;
};


// to use it

// const monthlyPKG = currentOffering?.availablePackages[0]
// const fiveTokensPKG = currentOffering?.availablePackages[1]
// const singleTokenPKG = currentOffering?.availablePackages[2]