import { useState } from "react";
import { useAppSelector } from "store/hooks";
import { selectUser } from "store/slices/authSlice";
import propertyService from "services/propertyService";

export const useAdmin = () => {
  const user = useAppSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAdmin = user?.role === "admin";
  const isAgent = user?.role === "agent";
  const canManageProperties = isAdmin || isAgent;

  const clearError = () => setError(null);

  const executeWithLoading = async (operation) => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();
      return result;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllProperties = (params) =>
    executeWithLoading(() => propertyService.getAllProperties(params));

  const getProperty = (id) =>
    executeWithLoading(() => propertyService.getProperty(id));

  const createProperty = (data) =>
    executeWithLoading(() => propertyService.createProperty(data));

  const updateProperty = (id, data) =>
    executeWithLoading(() => propertyService.updateProperty(id, data));

  const deleteProperty = (id) =>
    executeWithLoading(() => propertyService.deleteProperty(id));

  const permanentDeleteProperty = (id) =>
    executeWithLoading(() => propertyService.permanentDeleteProperty(id));

  const updatePropertyStatus = (id, status) =>
    executeWithLoading(() => propertyService.updatePropertyStatus(id, status));

  const toggleFeaturedStatus = (id) =>
    executeWithLoading(() => propertyService.toggleFeaturedStatus(id));

  const bulkUpdateProperties = (propertyIds, updateData) =>
    executeWithLoading(() =>
      propertyService.bulkUpdateProperties(propertyIds, updateData)
    );

  const getPropertyStats = () =>
    executeWithLoading(() => propertyService.getPropertyStats());

  const addPropertyImages = (id, images) =>
    executeWithLoading(() => propertyService.addPropertyImages(id, images));

  const removePropertyImage = (id, imageId) =>
    executeWithLoading(() => propertyService.removePropertyImage(id, imageId));

  const setPrimaryImage = (id, imageId) =>
    executeWithLoading(() => propertyService.setPrimaryImage(id, imageId));

  return {
    isAdmin,
    isAgent,
    canManageProperties,
    loading,
    error,
    clearError,
    getAllProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    permanentDeleteProperty,
    updatePropertyStatus,
    toggleFeaturedStatus,
    bulkUpdateProperties,
    getPropertyStats,
    addPropertyImages,
    removePropertyImage,
    setPrimaryImage,
  };
};
