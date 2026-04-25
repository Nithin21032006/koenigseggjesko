"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { ConfigOption, paintOptions, wheelOptions, interiorOptions, packageOptions } from '@/data/configOptions';
import { getCarById, CAR_MODELS } from '@/data/cars';

interface ConfiguratorState {
  selectedCarId: string;
  paint: ConfigOption;
  wheels: ConfigOption;
  interior: ConfigOption;
  packages: ConfigOption[];
  totalPrice: number;
}

interface ConfiguratorContextType {
  state: ConfiguratorState;
  setSelectedCarId: (id: string) => void;
  setPaint: (option: ConfigOption) => void;
  setWheels: (option: ConfigOption) => void;
  setInterior: (option: ConfigOption) => void;
  togglePackage: (option: ConfigOption) => void;
  carData: typeof CAR_MODELS[0];
}

const initialState: Omit<ConfiguratorState, 'totalPrice'> = {
  selectedCarId: 'jesko', // default
  paint: paintOptions[0],
  wheels: wheelOptions[0],
  interior: interiorOptions[0],
  packages: [],
};

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

export const ConfiguratorProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<Omit<ConfiguratorState, 'totalPrice'>>(initialState);

  const carData = useMemo(() => getCarById(state.selectedCarId), [state.selectedCarId]);

  const totalPrice = useMemo(() => {
    let total = carData.basePrice;
    total += state.paint.price;
    total += state.wheels.price;
    total += state.interior.price;
    state.packages.forEach(pkg => {
      total += pkg.price;
    });
    return total;
  }, [carData.basePrice, state.paint, state.wheels, state.interior, state.packages]);

  const setSelectedCarId = useCallback((id: string) => {
    setState(prev => prev.selectedCarId === id ? prev : { ...prev, selectedCarId: id });
  }, []);

  const setPaint = useCallback((option: ConfigOption) => {
    setState(prev => prev.paint.id === option.id ? prev : { ...prev, paint: option });
  }, []);

  const setWheels = useCallback((option: ConfigOption) => {
    setState(prev => prev.wheels.id === option.id ? prev : { ...prev, wheels: option });
  }, []);

  const setInterior = useCallback((option: ConfigOption) => {
    setState(prev => prev.interior.id === option.id ? prev : { ...prev, interior: option });
  }, []);

  const togglePackage = useCallback((option: ConfigOption) => {
    setState(prev => {
      const exists = prev.packages.find(p => p.id === option.id);
      if (exists) {
        return { ...prev, packages: prev.packages.filter(p => p.id !== option.id) };
      }
      return { ...prev, packages: [...prev.packages, option] };
    });
  }, []);

  const enhancedState = {
    ...state,
    totalPrice
  };

  return (
    <ConfiguratorContext.Provider value={{
      state: enhancedState,
      setSelectedCarId,
      setPaint,
      setWheels,
      setInterior,
      togglePackage,
      carData
    }}>
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  const context = useContext(ConfiguratorContext);
  if (context === undefined) {
    throw new Error('useConfigurator must be used within a ConfiguratorProvider');
  }
  return context;
};
