const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    throw error;
  }
};

// Facilitators
export const getFacilitators = () => apiCall('/facilitators');
export const createFacilitator = (data) => apiCall('/facilitators', { method: 'POST', body: JSON.stringify(data) });
export const updateFacilitator = (id, data) => apiCall(`/facilitators/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteFacilitator = (id) => apiCall(`/facilitators/${id}`, { method: 'DELETE' });

// Stats
export const getStats = () => apiCall('/stats');
export const createStats = (data) => apiCall('/stats', { method: 'POST', body: JSON.stringify(data) });

// Phases
export const getPhases = () => apiCall('/phases');
export const createPhase = (data) => apiCall('/phases', { method: 'POST', body: JSON.stringify(data) });

// Objectives
export const getObjectives = () => apiCall('/objectives');
export const createObjective = (data) => apiCall('/objectives', { method: 'POST', body: JSON.stringify(data) });

// Outcomes
export const getOutcomes = () => apiCall('/outcomes');
export const createOutcome = (data) => apiCall('/outcomes', { method: 'POST', body: JSON.stringify(data) });

// Challenges
export const getChallenges = () => apiCall('/challenges');
export const createChallenge = (data) => apiCall('/challenges', { method: 'POST', body: JSON.stringify(data) });

// Challenge Solutions
export const getChallengeSolutions = () => apiCall('/challenge-solutions');
export const createChallengeSolution = (data) => apiCall('/challenge-solutions', { method: 'POST', body: JSON.stringify(data) });

// References
export const getReferences = () => apiCall('/references');
export const createReference = (data) => apiCall('/references', { method: 'POST', body: JSON.stringify(data) });

// Activities
export const getActivities = () => apiCall('/activities');
export const getActivity = (id) => apiCall(`/activities/${id}`);
export const createActivity = (data) => apiCall('/activities', { method: 'POST', body: JSON.stringify(data) });
export const updateActivity = (id, data) => apiCall(`/activities/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteActivity = (id) => apiCall(`/activities/${id}`, { method: 'DELETE' });

// Calendar Events
export const getCalendarEvents = () => apiCall('/calendar-events');
export const createCalendarEvent = (data) => apiCall('/calendar-events', { method: 'POST', body: JSON.stringify(data) });

// Modules
export const getModules = () => apiCall('/modules');
export const createModule = (data) => apiCall('/modules', { method: 'POST', body: JSON.stringify(data) });
export const updateModule = (id, data) => apiCall(`/modules/${id}`, { method: 'PUT', body: JSON.stringify(data) });

// Resources
export const getResources = () => apiCall('/resources');
export const createResource = (data) => apiCall('/resources', { method: 'POST', body: JSON.stringify(data) });

// FAQs
export const getFAQs = () => apiCall('/faqs');
export const createFAQ = (data) => apiCall('/faqs', { method: 'POST', body: JSON.stringify(data) });

// Badges
export const getBadges = () => apiCall('/badges');
export const createBadge = (data) => apiCall('/badges', { method: 'POST', body: JSON.stringify(data) });
export const updateBadge = (id, data) => apiCall(`/badges/${id}`, { method: 'PUT', body: JSON.stringify(data) });

// Announcements
export const getAnnouncements = () => apiCall('/announcements');
export const createAnnouncement = (data) => apiCall('/announcements', { method: 'POST', body: JSON.stringify(data) });
export const updateAnnouncement = (id, data) => apiCall(`/announcements/${id}`, { method: 'PUT', body: JSON.stringify(data) });

// Threads
export const getThreads = () => apiCall('/threads');
export const createThread = (data) => apiCall('/threads', { method: 'POST', body: JSON.stringify(data) });
export const updateThread = (id, data) => apiCall(`/threads/${id}`, { method: 'PUT', body: JSON.stringify(data) });
