// Manages saving/restoring search state from sessionStorage
export const useSearchRestore = () => {
    // Restore previous state (only if user clicked "Back")
    const restore = () => {
      const should = sessionStorage.getItem('restoreOnBack') === 'true';
      if (!should) return null;
  
      sessionStorage.removeItem('restoreOnBack');
  
      return {
        repos: JSON.parse(sessionStorage.getItem('lastSearchRepos') || '[]'),
        username: sessionStorage.getItem('lastSearchUser') || '',
        page: parseInt(sessionStorage.getItem('lastSearchPage') || '1'),
      };
    };
  
    // Save current state before navigating to details page
    const save = (repos, username, page) => {
      sessionStorage.setItem('restoreOnBack', 'true');
      sessionStorage.setItem('lastSearchUser', username);
      sessionStorage.setItem('lastSearchRepos', JSON.stringify(repos));
      sessionStorage.setItem('lastSearchPage', page.toString());
    };
  
    return { restore, save };
  };
  