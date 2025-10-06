// src/context/AdProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import defaultAdConfig from "../config/adconfig";

const AdContext = createContext();

const LOCAL_KEY = "app_add";

export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState({});
  console.log(ads);

  // load from localStorage or default
  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) {
      try {
        setAds(JSON.parse(raw));
        return;
      } catch (e) {
        console.warn(
          "Invalid ad config in localStorage, falling back to default."
        );
      }
    }
    setAds(defaultAdConfig);
  }, []);

  // persist whenever ads change
  useEffect(() => {
    if (Object.keys(ads).length) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(ads));
    }
  }, [ads]);

  // utility: get ads for a page and optional position
  const getAdsFor = (page, position = null) => {
    const pageAds = ads?.[page] ?? [];
    if (position == null) return pageAds.filter((a) => a.enabled);
    return pageAds.filter((a) => a.position === position && a.enabled);
  };

  // update a particular ad entry by page & index (used by admin)
  const updateAd = (page, index, partial) => {
    setAds((prev) => {
      const pageArr = Array.isArray(prev[page]) ? [...prev[page]] : [];
      pageArr[index] = { ...pageArr[index], ...partial };
      return { ...prev, [page]: pageArr };
    });
  };

  // replace entire page config
  const setPageAds = (page, newArr) => {
    setAds((prev) => ({ ...prev, [page]: newArr }));
  };

  // add a new ad row for a page
  const addAd = (page, ad) => {
    setAds((prev) => {
      const pageArr = Array.isArray(prev[page]) ? [...prev[page]] : [];
      pageArr.push(ad);
      return { ...prev, [page]: pageArr };
    });
  };

  // remove ad by index
  const removeAd = (page, index) => {
    setAds((prev) => {
      const pageArr = Array.isArray(prev[page]) ? [...prev[page]] : [];
      pageArr.splice(index, 1);
      return { ...prev, [page]: pageArr };
    });
  };

  // allow replacing the whole config (advanced)
  const replaceConfig = (newConfig) => setAds(newConfig);

  return (
    <AdContext.Provider
      value={{
        ads,
        getAdsFor,
        updateAd,
        setPageAds,
        addAd,
        removeAd,
        replaceConfig,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

export const useAds = () => useContext(AdContext);
