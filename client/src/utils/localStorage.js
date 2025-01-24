// Lưu dữ liệu vào localStorage
export const saveToLocalStorage = (key, value) => {
  if (!key || value === undefined) return;
  localStorage.setItem(key, JSON.stringify(value));
};

// Lấy dữ liệu từ localStorage
export const getFromLocalStorage = (key) => {
  if (!key) return null;
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

// Xóa một mục trong localStorage
export const removeFromLocalStorage = (key) => {
  if (!key) return;
  localStorage.removeItem(key);
};

// Xóa tất cả dữ liệu trong localStorage
export const clearLocalStorage = () => {
  localStorage.clear();
};
