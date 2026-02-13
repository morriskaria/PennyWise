'use client';

import React, { useState } from 'react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  status: 'coming-soon' | 'connected' | 'available';
  subtitle?: string;
}

const integrations: Integration[] = [
  {
    id: '1',
    name: 'KRA iTax',
    description: 'Direct VAT and Income Tax filing integration with the Kenya Revenue Authority portal.',
    icon: 'account_balance',
    iconColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    status: 'coming-soon',
  },
  {
    id: '2',
    name: 'M-Pesa Business',
    description: 'Sync transactions from your Lipa na M-Pesa Till or Paybill number automatically.',
    icon: 'payments',
    iconColor: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    status: 'connected',
  },
  {
    id: '3',
    name: 'Bank Feeds',
    description: 'Connect your local Kenyan bank accounts for real-time transaction reconciliation.',
    subtitle: 'NCBA, KCB, Equity & more',
    icon: 'sync_alt',
    iconColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    status: 'available',
  },
  {
    id: '4',
    name: 'QuickBooks Import',
    description: 'Easily migrate your historical bookkeeping data from QuickBooks Desktop or Online.',
    subtitle: 'Legacy Data Migration',
    icon: 'upload_file',
    iconColor: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    status: 'available',
  },
];

export default function IntegrationsPage() {
  const [connectedIntegrations, setConnectedIntegrations] = useState(['2']);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleToggleIntegration = (integrationId: string) => {
    if (connectedIntegrations.includes(integrationId)) {
      setConnectedIntegrations(connectedIntegrations.filter((id) => id !== integrationId));
    } else {
      setConnectedIntegrations([...connectedIntegrations, integrationId]);
    }
  };

  const getStatusDisplay = (integration: Integration) => {
    switch (integration.status) {
      case 'coming-soon':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded">
            Coming Soon
          </span>
        );
      case 'connected':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase">
            <span className="size-1.5 bg-primary rounded-full"></span> Connected
          </span>
        );
      default:
        return null;
    }
  };

  const getButtonState = (integration: Integration) => {
    if (integration.status === 'coming-soon') {
      return (
        <button disabled className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 text-sm font-bold rounded-lg cursor-not-allowed">
          Enable
        </button>
      );
    }

    if (integration.status === 'connected') {
      return (
        <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-lg transition-colors">
          Configure
        </button>
      );
    }

    return (
      <button
        onClick={() => handleToggleIntegration(integration.id)}
        className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/20"
      >
        Enable
      </button>
    );
  };

  return (
    <div className="space-y-12">
      {/* Third-Party Integrations */}
      <section>
        <div className="mb-6">
          <h3 className="text-lg font-bold dark:text-white">Third-Party Integrations</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Connect Pennywise with your favorite business tools and local financial services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <div key={integration.id} className="bg-white dark:bg-neutral-slate rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col justify-between">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-lg flex items-center justify-center ${integration.iconColor}`}>
                    <span className="material-symbols-outlined text-3xl">{integration.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-white">{integration.name}</h4>
                    {integration.subtitle && <p className="text-xs text-slate-500">{integration.subtitle}</p>}
                    {getStatusDisplay(integration)}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{integration.description}</p>
              {getButtonState(integration)}
            </div>
          ))}
        </div>
      </section>

      {/* API Keys Section */}
      <section id="api-keys">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold dark:text-white">API Keys</h3>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">Advanced</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Generate and manage API keys to build custom integrations or automate your workflow.</p>
        </div>

        <div className="bg-white dark:bg-neutral-slate rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/10 rounded-lg">
              <div className="flex gap-3 items-center">
                <span className="material-symbols-outlined text-primary">terminal</span>
                <p className="text-sm text-slate-600 dark:text-slate-300">Developers can use our REST API to extend Pennywise functionality.</p>
              </div>
              <a href="#" className="text-sm font-bold text-primary hover:underline">
                Read Documentation
              </a>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 dark:bg-background-dark/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-sm font-semibold dark:text-white">Production Secret Key</p>
                  <p className="text-xs font-mono text-slate-500 mt-1">
                    {showApiKey ? 'pk_live_1234567890abcdef1234567890abcdef3a9f' : 'pk_live_************************3a9f'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">{showApiKey ? 'visibility' : 'visibility_off'}</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('pk_live_1234567890abcdef1234567890abcdef3a9f');
                      alert('API key copied to clipboard');
                    }}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">content_copy</span>
                  </button>
                  <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg w-full justify-center text-slate-500 hover:text-primary hover:border-primary transition-all group">
                <span className="material-symbols-outlined">add</span>
                <span className="text-sm font-bold">Generate New API Key</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-4 pb-12">
        <button className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          Back to Dashboard
        </button>
        <button className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
          Update Preferences
        </button>
      </div>
    </div>
  );
}
