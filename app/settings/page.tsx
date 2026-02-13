'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [businessInfo, setBusinessInfo] = useState({
    businessName: 'Pennywise SME',
    businessEmail: 'info@pennywise.ke',
    registrationNumber: 'PVT/001234567',
    kraPin: '107345876A',
    phoneNumber: '+254 712 345 678',
    address: '123 Business Park, Nairobi',
    city: 'Nairobi',
    state: 'Nairobi County',
    postalCode: '00100',
    country: 'Kenya',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold dark:text-white mb-2">Business Profile</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your business information, legal details, and compliance settings.</p>
      </div>

      {/* Business Information */}
      <div className="bg-white dark:bg-neutral-slate rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-8">
        <h4 className="text-lg font-bold dark:text-white mb-6">Business Information</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={businessInfo.businessName}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Business Email</label>
            <input
              type="email"
              name="businessEmail"
              value={businessInfo.businessEmail}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={businessInfo.registrationNumber}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">KRA PIN</label>
            <input
              type="text"
              name="kraPin"
              value={businessInfo.kraPin}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={businessInfo.phoneNumber}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Street Address</label>
          <input
            type="text"
            name="address"
            value={businessInfo.address}
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">City</label>
            <input
              type="text"
              name="city"
              value={businessInfo.city}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">State/County</label>
            <input
              type="text"
              name="state"
              value={businessInfo.state}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={businessInfo.postalCode}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Country</label>
            <input
              type="text"
              name="country"
              value={businessInfo.country}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/20 rounded-xl p-6 flex gap-4">
        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 flex-shrink-0">info</span>
        <div>
          <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1">KRA Compliance</h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            Your business information is used to generate KRA-compliant reports. Ensure all details match your official business registration documents and tax identification numbers.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 py-8">
        <button className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          Discard Changes
        </button>
        <button className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
          Save Changes
        </button>
      </div>
    </section>
  );
}
