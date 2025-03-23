'use client';
import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RepoList from '../components/RepoList';
import DarkModeToggle from '../components/DarkModeToggle';
import { useSearchRestore } from './hooks/useSearchRestore';
import { fetchUserRepos } from './utils/github';
import styles from './page.module.css';

export default function HomePage() {
  const [repos, setRepos] = useState([]);
  const [username, setUsername] = useState('');
  const [sortByStars, setSortByStars] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // Custom hook to restore or save session state
  const { restore, save } = useSearchRestore();

  // Restore previous session only when returning from details page
  useEffect(() => {
    const restored = restore();
    if (restored) {
      setUsername(restored.username);
      setRepos(restored.repos);
      setPage(restored.page);
      setHasMore(true);
    }
  }, []);

  // Fetch repos from GitHub
  const fetchRepos = useCallback(async (user, currentPage) => {
    if (!user) return;
    setLoading(true);
    try {
      const newRepos = await fetchUserRepos(user, currentPage);
      setRepos(prev => currentPage === 1 ? newRepos : [...prev, ...newRepos]);
      setHasMore(newRepos.length === 10); // Check if more pages exist
    } catch (err) {
      console.error(err);
      setRepos([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger fetch when username or page changes
  useEffect(() => {
    if (username) {
      fetchRepos(username, page);
    }
  }, [username, page, fetchRepos]);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (nearBottom && !loading && hasMore) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  // Handle search input from user
  const handleSearch = useCallback((user) => {
    setRepos([]);
    setUsername(user);
    setPage(1);
    setHasMore(true);
  }, []);

  // Save state to session before navigating to details page
  const handleRepoClick = () => {
    save(repos, username, page);
  };

  return (
    <main>
      <RepoList repos={repos} sortByStars={sortByStars} onRepoClick={handleRepoClick} />
      {loading && <p className={styles.loading}>Loading...</p>}

      <div className={styles.topControls}>
        <DarkModeToggle />
        <SearchBar onSearch={handleSearch} />
        <button onClick={() => setSortByStars(prev => !prev)}>
          Sort by Stars
        </button>
      </div>

      <div className={styles.bottomSpace}></div>
    </main>
  );
}
