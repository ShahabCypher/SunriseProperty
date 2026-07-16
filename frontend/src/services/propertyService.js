import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "config/api";

const api = axios.create({
  baseURL: `${API_BASE_URL}/properties`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class PropertyService {
  async getAllProperties(params = {}) {
    const response = await api.get("/", { params });
    return response.data;
  }

  async getProperty(id) {
    const response = await api.get(`/${id}`);
    return response.data;
  }

  async createProperty(formData) {
    const response = await api.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async updateProperty(id, data) {
    const response = await api.put(`/${id}`, data);
    return response.data;
  }

  async deleteProperty(id) {
    const response = await api.delete(`/${id}`);
    return response.data;
  }

  async permanentDeleteProperty(id) {
    const response = await api.delete(`/${id}/permanent`);
    return response.data;
  }

  async updatePropertyStatus(id, status) {
    const response = await api.patch(`/${id}/status`, { status });
    return response.data;
  }

  async toggleFeaturedStatus(id) {
    const response = await api.patch(`/${id}/toggle-featured`);
    return response.data;
  }

  async bulkUpdateProperties(propertyIds, updateData) {
    const response = await api.patch("/bulk/update", {
      propertyIds,
      updateData,
    });
    return response.data;
  }

  async getPropertyStats() {
    const response = await api.get("/admin/stats");
    return response.data;
  }

  async addPropertyImages(id, images) {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await api.post(`/${id}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async addPropertyImagesUrls(id, imageUrls) {
    const formData = new FormData();
    imageUrls.forEach((url) => {
      formData.append("imageUrls", url);
    });

    const response = await api.post(`/${id}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async removePropertyImage(id, imageId) {
    const response = await api.delete(`/${id}/images/${imageId}`);
    return response.data;
  }

  async setPrimaryImage(id, imageId) {
    const response = await api.patch(`/${id}/images/${imageId}/primary`);
    return response.data;
  }
}

export default new PropertyService();
