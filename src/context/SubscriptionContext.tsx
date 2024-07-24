import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {
  purchaseErrorListener,
  PurchaseError,
  purchaseUpdatedListener,
  initConnection,
  getSubscriptions,
  getPurchaseHistory,
  finishTransaction,
  endConnection,
  requestSubscription,
  getProducts,
  Product,
  Sku,
  acknowledgePurchaseAndroid,
  requestPurchase,
} from 'react-native-iap';

import axios from 'axios';
import analytics from '@react-native-firebase/analytics';
import {APP_PACKAGE_NAME, VALIDATE_SUBSCRIPTION_API} from '@constants';
// import { useToken } from '../TokenContext';

const subscriptionSKUs = Platform.select({
  ios: [''],
  android: ['subscriptionSKU'],
});
const productSKUs = Platform.select({
  ios: [''],
  android: ['productSKU1', 'productSKU2'],
});

let purchaseUpdateSubscription: any;
let purchaseErrorSubscription: any;


interface SubscriptionContextProps {
  subscriptions: any[];
  handleBuySubscription: (
    productId: string,
    offerToken?: string | undefined,
  ) => Promise<void>;
  handleBuyProduct: (sku: string) => Promise<void>;
  isSubscribed: boolean;
  products:any;
  currentSubscriptionPlan: string;
}

interface OfferTokenInfo {
  offerToken: string;
  productId: string;
  offerId: string;
  formattedPrice: string;
  priceCurrencyCode: string;
}

// isSubscribed = false & currentSubscriptionPlan is null // it means Not Yet Subscribed // initial state
// isSubscribed = true & currentSubscriptionPlan has productId // it means Active
// isSubscribed = false & currentSubscriptionPlan has product id // it means Expired

const SubscriptionContext = createContext<SubscriptionContextProps | undefined>(
  undefined,
);

export const useSubscriptionContext = (): SubscriptionContextProps => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      'useSubscriptionContext must be used within a SubscriptionProvider',
    );
  }
  return context;
};

export const SubscriptionProvider: any = ({children}: any) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [currentSubscriptionPlan, setCurrentSubscriptionPlan] =
    useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [subscriptions, setSubscriptions] = useState<any>([]);

//   const { handleBuyFiveTokens, handleBuySingeTokens } = useToken()


  useEffect(() => {
    const initialize = async () => {
      try {
        await initConnection();
        // Get Subscriptions
        const resSubscriptions = await getSubscriptions({
          skus: subscriptionSKUs!,
        });
        // console.log("========== SUBSCRIPTIONS ============")
        // console.log(JSON.stringify(resSubscriptions, null, 2));
        // console.log("=====================================")
        const offerTokensByProductId: {[productId: string]: OfferTokenInfo[]} = {};
          resSubscriptions.forEach((item: any) => {
          const productId = item.productId;
          item.subscriptionOfferDetails.forEach((offer:any) => {
            const offerId = offer.offerId; // Include offer ID
            const offerToken = offer.offerToken;
            const formattedPrice =
              offer.pricingPhases.pricingPhaseList[0].formattedPrice;
            const priceCurrencyCode =
              offer.pricingPhases.pricingPhaseList[0].priceCurrencyCode;
            if (!offerTokensByProductId[productId]) {
              offerTokensByProductId[productId] = [];
            }
            // Including offer ID along with offer token and product ID
            offerTokensByProductId[productId].push({
              offerToken,
              productId,
              offerId,
              formattedPrice,
              priceCurrencyCode,
            });
          });
        });
        setSubscriptions(offerTokensByProductId);
        // Get Products
        const resProducts = await getProducts({skus: productSKUs!});
        setProducts(resProducts);

        const purchaseHistory = await getPurchaseHistory();
        // console.log('========PURCHASE HISTORY============');
        // console.log(console.log(JSON.stringify(purchaseHistory)));
        // console.log('=================================');
        if (purchaseHistory && purchaseHistory.length > 0) {
          purchaseHistory.sort((a, b) => b.transactionDate - a.transactionDate);
          const lastPurchase = purchaseHistory[0];
          // const lastPurchase = purchaseHistory[purchaseHistory.length - 1];
          const receipt = lastPurchase.transactionReceipt;
          if (receipt) validate(receipt);
          return true;
        }
      } catch (error: any) {
        console.log('Error at initializing: ', JSON.stringify(error));
        return false;
      }
    };

    initialize().then(res => {
      if (res) {
        purchaseErrorSubscription = purchaseErrorListener(
          (error: PurchaseError) => {
            console.log(error.message);
            Alert.alert('Oops', 'Something went wrong. Please try again.');
          },
        );

        purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            JSON.parse(receipt)['productId'] === 'subscriptionSKUs' && validate(receipt);
            await finishTransaction({purchase, isConsumable: true});
            handleConsumableProductAndReceipt(purchase.productId, receipt);
            await acknowledgePurchase(purchase);
            const productId = JSON.parse(receipt)['productId'] 
            const packagePurchased =
            productId === 'subscriptionSKUs' ? 'sub_monthly' : productId === "productSKU1" ? '5_tokens':"1_token" ;
            analytics().logEvent(packagePurchased);
          }
        });
      }
    });


    return () => {
      try {
        purchaseUpdateSubscription.remove();
      } catch (error) {}
      try {
        purchaseErrorSubscription.remove();
      } catch (error) {}
      try {
        endConnection();
      } catch (error) {}
    };
  }, []);

  const validate = async (receipt: any) => {
    console.log('========RECEIPT============');
    console.log(console.log(JSON.stringify(JSON.parse(receipt), null, 2)));
    console.log('=================================');

    try {
      // store it so we can pass it to manage subscription as we have 2 subscriptions
      const response = await axios.post(VALIDATE_SUBSCRIPTION_API, {
        data: JSON.parse(receipt),
        packageName: APP_PACKAGE_NAME,
      });
      // console.log('========RESPONSE VALIDATE RECEIPT============');
      // console.log(console.log(JSON.stringify(response.data, null, 2)));
      // console.log('=================================');
      setCurrentSubscriptionPlan(JSON.parse(receipt)['productId']);
      if (response.data.isSubscriptionActive) {
        setIsSubscribed(true);
      }
    } catch (error: any) {
      console.log(error.message);
      Alert.alert('Oops! ', 'Something went wrong please try again.');
    }
  };

  const acknowledgePurchase = async (purchase:any) => {
    if (Platform.OS === 'android') {
      await acknowledgePurchaseAndroid({
            token: purchase.purchaseToken!,
            developerPayload: purchase.developerPayloadAndroid,
      });
    }
    // For iOS, there's no need for explicit acknowledgment
  };

  const handleConsumableProductAndReceipt = (
    productId: string,
    receipt: any,
  ) => {
    if (productId === "productSKU1"){
    //   handleBuySingeTokens()
    }
    if (productId === "productSKU2"){
    //   handleBuyFiveTokens()
    }
    console.log("productId for tokens: ", productId)
    // console.log("receipt: ", productId)
  };

  const handleBuySubscription = async (
    productId: string,
    offerToken?: string,
  ) => {
    try {
      await requestSubscription({
        sku: productId,
        ...(offerToken && {
          subscriptionOffers: [{sku: productId, offerToken}],
        }),
      });
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.log({message: `[${error.code}]: ${error.message}`, error});
      } else {
        console.log({message: 'handleBuySubscription', error});
      }
    }
  };

  const handleBuyProduct = async (sku: Sku) => {
    try {
      await requestPurchase({skus: [sku]});
      // updateUserVirtualCurrencyBalance(sku);
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.log({message: `[${error.code}]: ${error.message}`, error});
      } else {
        console.log({message: 'handleBuyProduct', error});
      }
    }
  };

  const value = {
    subscriptions,
    products,
    handleBuySubscription,
    handleBuyProduct,
    isSubscribed,
    currentSubscriptionPlan,
  };
  // console.log("=======isSubscribe, currentSubscriptionPlan=======")
  // console.log({isSubscribed,currentSubscriptionPlan})
  // console.log("==============")

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};