'use client';

import React, { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Accountant' | 'Staff';
  initials: string;
  permissions: {
    manageInvoices: boolean;
    viewReports: boolean;
    editSettings: boolean;
  };
}

const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@pennywise.ke',
    role: 'Administrator',
    initials: 'JD',
    permissions: {
      manageInvoices: true,
      viewReports: true,
      editSettings: true,
    },
  },
  {
    id: '2',
    name: 'Kevin Maina',
    email: 'kevin@kmaina-associates.ke',
    role: 'Accountant',
    initials: 'KM',
    permissions: {
      manageInvoices: true,
      viewReports: true,
      editSettings: false,
    },
  },
  {
    id: '3',
    name: 'Sarah Otieno',
    email: 'sarah@pennywise.ke',
    role: 'Staff',
    initials: 'SO',
    permissions: {
      manageInvoices: true,
      viewReports: false,
      editSettings: false,
    },
  },
];

export default function UsersPage() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  const handlePermissionToggle = (memberId: string, permission: keyof TeamMember['permissions']) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === memberId && member.role !== 'Administrator'
          ? {
              ...member,
              permissions: {
                ...member.permissions,
                [permission]: !member.permissions[permission],
              },
            }
          : member
      )
    );
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrator':
        return 'bg-primary/10 text-primary';
      case 'Accountant':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold dark:text-white">Team Management</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Control who has access to your business account and their specific permissions.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:brightness-110 transition-all w-fit">
          <span className="material-symbols-outlined text-sm">person_add</span>
          Invite User
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-slate rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Team Member</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Role</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Manage Invoices</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">View Reports</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Edit Settings</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {teamMembers.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold uppercase">
                      {member.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold dark:text-white">{member.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{member.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={member.permissions.manageInvoices}
                    disabled={member.role === 'Administrator'}
                    onChange={() => handlePermissionToggle(member.id, 'manageInvoices')}
                    className={`w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary dark:bg-background-dark/50 dark:border-slate-600 ${
                      member.role === 'Administrator' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={member.permissions.viewReports}
                    disabled={member.role === 'Administrator'}
                    onChange={() => handlePermissionToggle(member.id, 'viewReports')}
                    className={`w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary dark:bg-background-dark/50 dark:border-slate-600 ${
                      member.role === 'Administrator' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={member.permissions.editSettings}
                    disabled={member.role === 'Administrator'}
                    onChange={() => handlePermissionToggle(member.id, 'editSettings')}
                    className={`w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary dark:bg-background-dark/50 dark:border-slate-600 ${
                      member.role === 'Administrator' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    disabled={member.role === 'Administrator'}
                    className={`text-xs font-bold transition-colors ${
                      member.role === 'Administrator'
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-primary hover:underline'
                    }`}
                  >
                    Edit Permissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-6 bg-slate-50/30 dark:bg-slate-800/20 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing {teamMembers.length} active team members.</p>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 dark:border-slate-700 rounded hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-500">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="p-2 border border-slate-200 dark:border-slate-700 rounded hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-500">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex gap-4">
        <span className="material-symbols-outlined text-primary">security</span>
        <div>
          <h4 className="text-sm font-bold dark:text-white mb-1">About Access Control</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Permission changes take effect immediately. Administrators have full access to all modules including billing and user management. Staff members can only see the modules you explicitly grant them access to.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 py-12">
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
