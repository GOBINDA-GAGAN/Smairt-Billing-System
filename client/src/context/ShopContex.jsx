import { createContext, useContext, useState } from "react";
import { createShop, getShopApi } from "../api/shop.api";

const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(false);


  const shopCreate = async (data) => {
    try {
      setLoading(true);

      const response = await createShop(data);

      if (!response.data.status) {
        throw new Error(response.data.message);
      }

      const shopData = response.data.newShop;

      setShop(shopData);

      return shopData;
    } catch (error) {
      setShop(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getShop = async () => {
    try {
      setLoading(true);

      const response = await getShopApi();
      
    //   if (!response.data.status) {
    //     throw new Error(response.data.message);
    //   }

      const shopData = response.data.shop;

       

      setShop(shopData);

      return shopData;
    } catch (error) {

      setShop(null);
    } finally {
      setLoading(false);
    }
  };


  return (
    <ShopContext.Provider value={{ shop, loading, shopCreate, getShop }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
};
