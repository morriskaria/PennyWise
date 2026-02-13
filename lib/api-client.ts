/**
 * API Client Utilities for PennyWise Frontend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Generic fetch wrapper
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.error || error.message || `API error: ${response.statusText}`);
  }

  return response.json();
}

// Invoice APIs
export const invoiceAPI = {
  async getAll(userId: string, status?: string) {
    const params = new URLSearchParams({ userId });
    if (status && status !== "all") params.append("status", status);
    return apiCall(`/invoices?${params}`);
  },

  async getById(id: string) {
    return apiCall(`/invoices/${id}`);
  },

  async create(userId: string, data: any) {
    return apiCall("/invoices", {
      method: "POST",
      body: JSON.stringify({ userId, ...data }),
    });
  },

  async update(id: string, data: any) {
    return apiCall(`/invoices/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiCall(`/invoices/${id}`, {
      method: "DELETE",
    });
  },
};

// Business Profile API
export const businessProfileAPI = {
  async get(userId: string) {
    return apiCall(`/business-profile?userId=${userId}`);
  },

  async create(userId: string, data: any) {
    return apiCall("/business-profile", {
      method: "POST",
      body: JSON.stringify({ userId, ...data }),
    });
  },

  async update(userId: string, data: any) {
    return apiCall("/business-profile", {
      method: "PUT",
      body: JSON.stringify({ userId, ...data }),
    });
  },
};

// Team Member APIs
export const teamMemberAPI = {
  async getAll(userId: string) {
    return apiCall(`/team-members?userId=${userId}`);
  },

  async getById(id: string) {
    return apiCall(`/team-members/${id}`);
  },

  async create(userId: string, data: any) {
    return apiCall("/team-members", {
      method: "POST",
      body: JSON.stringify({ userId, ...data }),
    });
  },

  async update(id: string, data: any) {
    return apiCall(`/team-members/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiCall(`/team-members/${id}`, {
      method: "DELETE",
    });
  },
};

// Audit Log APIs
export const auditLogAPI = {
  async getAll(userId: string, action?: string, limit?: number, skip?: number) {
    const params = new URLSearchParams({ userId });
    if (action) params.append("action", action);
    if (limit) params.append("limit", limit.toString());
    if (skip) params.append("skip", skip.toString());
    return apiCall(`/audit-logs?${params}`);
  },

  async create(data: any) {
    return apiCall("/audit-logs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Integration APIs
export const integrationAPI = {
  async getAll(userId: string) {
    return apiCall(`/integrations?userId=${userId}`);
  },

  async getById(id: string) {
    return apiCall(`/integrations/${id}`);
  },

  async create(userId: string, data: any) {
    return apiCall("/integrations", {
      method: "POST",
      body: JSON.stringify({ userId, ...data }),
    });
  },

  async update(id: string, data: any) {
    return apiCall(`/integrations/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiCall(`/integrations/${id}`, {
      method: "DELETE",
    });
  },
};

// Dashboard APIs
export const dashboardAPI = {
  async getStats(userId: string) {
    return apiCall(`/dashboard?userId=${userId}`);
  },
};
