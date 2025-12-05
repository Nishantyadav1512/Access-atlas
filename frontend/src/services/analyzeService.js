import api from './api';

// Service for analyze and reports endpoints
const analyzeService = {
  analyzeUrl(url) {
    // Backend route: POST /api/analyze
    return api.post('/analyze', { url }).then((res) => res.data);
  },

  getReports() {
    // Backend route: GET /api/reports
    return api.get('/reports').then((res) => res.data);
  },

  getReportById(id) {
    // Backend route: GET /api/reports/:id
    return api.get(`/reports/${id}`).then((res) => res.data);
  },

  deleteReport(id) {
    // Backend route: DELETE /api/reports/:id
    return api.delete(`/reports/${id}`).then((res) => res.data);
  },
};

export default analyzeService;
