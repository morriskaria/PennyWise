/**
 * Custom React Hooks for API Data Fetching
 * Handles loading, error, and data states
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  invoiceAPI,
  businessProfileAPI,
  teamMemberAPI,
  auditLogAPI,
  integrationAPI,
  dashboardAPI,
} from './api-client';

// Generic fetch hook
export function useFetch<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    refetch();
  }, dependencies);

  return { data, loading, error, refetch };
}

// Invoice hooks
export function useInvoices(userId: string, status?: string) {
  return useFetch(
    () => invoiceAPI.getAll(userId, status),
    [userId, status]
  );
}

export function useInvoice(id: string) {
  return useFetch(
    () => invoiceAPI.getById(id),
    [id]
  );
}

export function useCreateInvoice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (userId: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      return await invoiceAPI.create(userId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create invoice';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

export function useUpdateInvoice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      return await invoiceAPI.update(id, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update invoice';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}

export function useDeleteInvoice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const delete_ = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      return await invoiceAPI.delete(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete invoice';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { delete: delete_, loading, error };
}

// Business Profile hooks
export function useBusinessProfile(userId: string) {
  return useFetch(
    () => businessProfileAPI.get(userId),
    [userId]
  );
}

export function useUpdateBusinessProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (userId: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      return await businessProfileAPI.update(userId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}

// Team Member hooks
export function useTeamMembers(userId: string) {
  return useFetch(
    () => teamMemberAPI.getAll(userId),
    [userId]
  );
}

export function useCreateTeamMember() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (userId: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      return await teamMemberAPI.create(userId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to invite team member';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

export function useUpdateTeamMember() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      return await teamMemberAPI.update(id, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update member';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}

// Audit Log hooks
export function useAuditLogs(userId: string, action?: string, limit?: number, skip?: number) {
  return useFetch(
    () => auditLogAPI.getAll(userId, action, limit, skip),
    [userId, action, limit, skip]
  );
}

// Integration hooks
export function useIntegrations(userId: string) {
  return useFetch(
    () => integrationAPI.getAll(userId),
    [userId]
  );
}

export function useCreateIntegration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (userId: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      return await integrationAPI.create(userId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create integration';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

// Dashboard hooks
export function useDashboardStats(userId: string) {
  return useFetch(
    () => dashboardAPI.getStats(userId),
    [userId]
  );
}
