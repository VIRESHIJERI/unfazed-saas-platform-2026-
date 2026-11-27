const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

async function request(path, options) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const schedulingApi = {
  getPublicAvailability: (slug) => request(`/scheduling/public/${slug}/availability`),
  getSlots: (slug, params) => request(`/scheduling/public/${slug}/slots?${new URLSearchParams(params)}`),
  createBooking: (payload) => request('/scheduling/bookings', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  getTherapistSessions: (therapistId) => request(`/scheduling/therapists/${therapistId}/sessions`),
  getTherapistAvailability: (therapistId) => request(`/scheduling/therapists/${therapistId}/availability`),
  saveAvailability: (therapistId, payload) => request(`/scheduling/therapists/${therapistId}/availability`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })
};
