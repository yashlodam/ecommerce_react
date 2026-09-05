import { api } from "../config/Api";

/**
 * Deal & Promotion API Service
 * Interacts directly with the ShopSphere Spring Boot Deal REST Controllers:
 * - Public: /api/deals/**
 * - Seller: /sellers/deals/**
 * - Admin:  /admin/deals/**
 */

// ─── Public Deal Endpoints ───────────────────────────────────────────────────

/**
 * Fetches all currently active marketplace promotional deals.
 * @returns {Promise<Array>} List of DealResponse objects
 */
export const getActiveDeals = async () => {
  const response = await api.get("/api/deals/active");
  return response.data;
};

/**
 * Fetches a single promotional deal by its primary ID.
 * @param {number|string} id 
 * @returns {Promise<Object>} DealResponse object
 */
export const getDealById = async (id) => {
  const response = await api.get(`/api/deals/${id}`);
  return response.data;
};

/**
 * Calculates authoritative real-time pricing breakdown applying the best eligible deal.
 * @param {number|string} productId 
 * @param {number|string|null} variantId 
 * @returns {Promise<Object>} ProductPricingDto
 */
export const getProductPricing = async (productId, variantId = null) => {
  const params = { productId };
  if (variantId) {
    params.variantId = variantId;
  }
  const response = await api.get("/api/deals/pricing", { params });
  return response.data;
};

// ─── Seller Deal Endpoints (Requires ROLE_SELLER) ────────────────────────────

/**
 * Fetches all promotional deals created by the authenticated seller.
 * @returns {Promise<Array>} List of DealResponse objects
 */
export const getSellerDeals = async () => {
  const response = await api.get("/sellers/deals");
  return response.data;
};

/**
 * Creates a promotional deal on seller's owned products.
 * @param {Object} dealData - DealRequest payload
 * @returns {Promise<Object>} Created DealResponse object
 */
export const createSellerDeal = async (dealData) => {
  const response = await api.post("/sellers/deals", dealData);
  return response.data;
};

/**
 * Updates an existing deal owned by the authenticated seller.
 * @param {number|string} id 
 * @param {Object} dealData - DealRequest payload
 * @returns {Promise<Object>} Updated DealResponse object
 */
export const updateSellerDeal = async (id, dealData) => {
  const response = await api.put(`/sellers/deals/${id}`, dealData);
  return response.data;
};

/**
 * Toggles the active/inactive status of a seller deal.
 * @param {number|string} id 
 * @returns {Promise<Object>} Updated DealResponse object
 */
export const toggleSellerDealStatus = async (id) => {
  const response = await api.patch(`/sellers/deals/${id}/status`);
  return response.data;
};

/**
 * Deletes a deal owned by the authenticated seller.
 * @param {number|string} id 
 * @returns {Promise<Object>} ApiResponse object ({ message: string })
 */
export const deleteSellerDeal = async (id) => {
  const response = await api.delete(`/sellers/deals/${id}`);
  return response.data;
};

// ─── Admin Deal Endpoints (Requires ROLE_ADMIN) ─────────────────────────────

/**
 * Fetches all deals across the marketplace (Admin).
 * @returns {Promise<Array>} List of DealResponse objects
 */
export const getAdminDeals = async () => {
  const response = await api.get("/admin/deals");
  return response.data;
};

/**
 * Creates a promotional deal across any scope (Product, Category, Seller, Order).
 * @param {Object} dealData - DealRequest payload
 * @returns {Promise<Object>} Created DealResponse object
 */
export const createAdminDeal = async (dealData) => {
  const response = await api.post("/admin/deals", dealData);
  return response.data;
};

/**
 * Updates a promotional deal by ID (Admin).
 * @param {number|string} id 
 * @param {Object} dealData - DealRequest payload
 * @returns {Promise<Object>} Updated DealResponse object
 */
export const updateAdminDeal = async (id, dealData) => {
  const response = await api.put(`/admin/deals/${id}`, dealData);
  return response.data;
};

/**
 * Toggles the active/inactive status of a deal (Admin).
 * @param {number|string} id 
 * @returns {Promise<Object>} Updated DealResponse object
 */
export const toggleAdminDealStatus = async (id) => {
  const response = await api.patch(`/admin/deals/${id}/status`);
  return response.data;
};

/**
 * Deletes a promotional deal by ID (Admin).
 * @param {number|string} id 
 * @returns {Promise<Object>} ApiResponse object ({ message: string })
 */
export const deleteAdminDeal = async (id) => {
  const response = await api.delete(`/admin/deals/${id}`);
  return response.data;
};
