"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useConfigurator } from "@/context/ConfiguratorContext";

export default function InquirePage() {
  const { state, carData } = useConfigurator();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    region: 'us',
    comments: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const payload = {
        user: formData,
        configuration: {
          carId: carData.id,
          carName: carData.name,
          basePrice: carData.basePrice,
          wheels: state.wheels,
          interior: state.interior,
          packages: state.packages,
          totalPrice: state.totalPrice
        }
      };
      
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Failed to submit configuration.');
      
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong');
    }
  };

  const formattedTotalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(state.totalPrice);

  const formatPrice = (price: number) => {
    if (price === 0) return "Included";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="bg-jesko-black min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-jesko-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full pt-32 pb-12 px-6 lg:px-12 relative z-10 gap-12">
        
        {/* Order Summary Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-5/12 bg-black/60 border border-carbon-gray p-8 lg:p-12 backdrop-blur-md"
        >
          <h2 className="text-2xl font-orbitron font-bold text-white uppercase tracking-widest mb-8 border-b border-carbon-gray pb-4">
            Configuration <span className="text-jesko-gold">Summary</span>
          </h2>

          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-carbon-gray/50 pb-4">
              <div>
                <p className="font-rajdhani text-gray-500 uppercase tracking-widest text-xs mb-1">Base Model</p>
                <p className="font-rajdhani text-white text-lg tracking-wider">{carData.name}</p>
              </div>
              <span className="font-rajdhani text-jesko-gold text-sm tracking-widest">{formatPrice(carData.basePrice)}</span>
            </div>



            <div className="flex justify-between items-start border-b border-carbon-gray/50 pb-4">
              <div>
                <p className="font-rajdhani text-gray-500 uppercase tracking-widest text-xs mb-1">Wheels</p>
                <p className="font-rajdhani text-white text-lg tracking-wider">{state.wheels.name}</p>
              </div>
              <span className="font-rajdhani text-jesko-gold text-sm tracking-widest">{formatPrice(state.wheels.price)}</span>
            </div>

            <div className="flex justify-between items-start border-b border-carbon-gray/50 pb-4">
              <div>
                <p className="font-rajdhani text-gray-500 uppercase tracking-widest text-xs mb-1">Interior</p>
                <p className="font-rajdhani text-white text-lg tracking-wider">{state.interior.name}</p>
              </div>
              <span className="font-rajdhani text-jesko-gold text-sm tracking-widest">{formatPrice(state.interior.price)}</span>
            </div>

            {state.packages.length > 0 && (
              <div className="border-b border-carbon-gray/50 pb-4 space-y-4">
                <p className="font-rajdhani text-gray-500 uppercase tracking-widest text-xs">Packages</p>
                {state.packages.map(pkg => (
                  <div key={pkg.id} className="flex justify-between items-start">
                    <p className="font-rajdhani text-white text-md tracking-wider flex items-center">
                      <span className="text-jesko-gold mr-2 text-xs">◆</span> {pkg.name}
                    </p>
                    <span className="font-rajdhani text-jesko-gold text-sm tracking-widest">{formatPrice(pkg.price)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-carbon-gray flex justify-between items-center">
             <div>
                <p className="font-rajdhani text-gray-500 uppercase tracking-widest text-xs mb-1">Estimated Total</p>
                <p className="font-orbitron font-bold text-white text-2xl tracking-widest">{formattedTotalPrice}</p>
             </div>
             <div className="text-right">
                <p className="font-rajdhani text-gray-500 uppercase tracking-widest text-xs mb-1">Deposit Required</p>
                <p className="font-orbitron font-bold text-jesko-gold text-xl tracking-widest">$500,000</p>
             </div>
          </div>
          
          <div className="mt-8 text-center sm:text-left">
            <Link href={`/configurator/${carData.id}`} className="font-rajdhani text-gray-400 hover:text-white transition-colors tracking-widest text-sm uppercase inline-flex items-center space-x-2 border-b border-transparent hover:border-white pb-1">
              <span>← Edit Configuration</span>
            </Link>
          </div>
        </motion.div>

        {/* User Details Form Column */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-7/12"
        >
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white uppercase tracking-widest">
              Secure <span className="text-jesko-gold">Allocation</span>
            </h1>
            <p className="font-rajdhani text-gray-400 tracking-wider text-lg">
              Submit your bespoke configuration details. An exclusive client representative will contact you to finalize the contract and collect the deposit.
            </p>
          </div>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-jesko-gold/10 border border-jesko-gold p-8 text-center"
            >
              <h2 className="text-2xl font-orbitron font-bold text-jesko-gold uppercase tracking-widest mb-4">Allocation Requested</h2>
              <p className="font-rajdhani text-white tracking-wider mb-6">
                Your bespoke configuration has been securely transmitted. An exclusive client representative will contact you shortly to finalize the deposit and allocation details.
              </p>
              <Link href="/cars" className="inline-block border border-jesko-gold text-jesko-gold hover:bg-jesko-gold hover:text-black font-rajdhani uppercase tracking-[0.2em] px-8 py-3 transition-colors">
                Return to Collection
              </Link>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-4 font-rajdhani text-sm tracking-wider">
                  {errorMessage}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-rajdhani text-sm tracking-[0.2em] text-jesko-gold uppercase">First Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-jesko-black/50 border border-carbon-gray focus:border-jesko-gold text-white font-rajdhani px-4 py-3 outline-none transition-colors duration-300"
                    placeholder="Christian"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-rajdhani text-sm tracking-[0.2em] text-jesko-gold uppercase">Last Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-jesko-black/50 border border-carbon-gray focus:border-jesko-gold text-white font-rajdhani px-4 py-3 outline-none transition-colors duration-300"
                    placeholder="von Koenigsegg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-rajdhani text-sm tracking-[0.2em] text-jesko-gold uppercase">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-jesko-black/50 border border-carbon-gray focus:border-jesko-gold text-white font-rajdhani px-4 py-3 outline-none transition-colors duration-300"
                  placeholder="vip@koenigsegg.com"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-rajdhani text-sm tracking-[0.2em] text-jesko-gold uppercase">Contact Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-jesko-black/50 border border-carbon-gray focus:border-jesko-gold text-white font-rajdhani px-4 py-3 outline-none transition-colors duration-300"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-rajdhani text-sm tracking-[0.2em] text-jesko-gold uppercase">Region</label>
                <select 
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                  className="w-full bg-jesko-black/50 border border-carbon-gray focus:border-jesko-gold text-white font-rajdhani px-4 py-3 outline-none transition-colors duration-300 appearance-none"
                >
                  <option value="us">North America</option>
                  <option value="eu">Europe</option>
                  <option value="me">Middle East</option>
                  <option value="as">Asia Pacific</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block font-rajdhani text-sm tracking-[0.2em] text-jesko-gold uppercase">Additional comments (Optional)</label>
                <textarea 
                  value={formData.comments}
                  onChange={(e) => setFormData({...formData, comments: e.target.value})}
                  className="w-full bg-jesko-black/50 border border-carbon-gray focus:border-jesko-gold text-white font-rajdhani px-4 py-3 outline-none transition-colors duration-300 h-24 resize-none"
                  placeholder="I am interested in arranging a factory visit..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-jesko-gold text-jesko-black hover:bg-bright-gold font-rajdhani font-bold tracking-[0.3em] uppercase py-4 transition-colors duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Transmitting...' : 'Submit Configuration Request'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
