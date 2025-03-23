'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ContributorList from '../../../../components/ContributorList';
import { fetchRepoDetails, fetchContributors } from '../../../utils/github';

const RepoDetailsPage = () => {
  const router = useRouter();
  const { user, repo } = useParams();

  const [details, setDetails] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  const contributorsCacheKey = `${user}/${repo}/contributors`;

  useEffect(() => {
    const fetchDetailsAndContributors = async () => {
      setLoading(true);
      try {
        // Fetch repository data
        const repoData = await fetchRepoDetails(user, repo);
        setDetails(repoData);

        // Try fetching contributors from cache first
        const cached = localStorage.getItem(contributorsCacheKey);
        if (cached) {
          setContributors(JSON.parse(cached));
        } else {
          const contributorData = await fetchContributors(user, repo);
          setContributors(contributorData);
          localStorage.setItem(contributorsCacheKey, JSON.stringify(contributorData));
        }
      } catch (err) {
        console.error('Error fetching repo details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailsAndContributors();
  }, [user, repo]);

  const handleBack = () => {
    router.back(); // Go back to previous search results
  };

  if (loading || !details) return <p>Loading repository...</p>;

  return (
    <div className="repo-details">
      <button onClick={handleBack}>&larr; Back</button>

      <h1>{details.name}</h1>
      <p>{details.description}</p>

      <div className="repo-meta">
        <span>⭐ {details.stargazers_count}</span>
        <span>💻 {details.language}</span>
        <span>🕒 Updated at: {new Date(details.updated_at).toLocaleString()}</span>
      </div>

      <a href={details.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub ↗
      </a>

      <h2>Top Contributors</h2>
      <ContributorList contributors={contributors} />
    </div>
  );
};

export default RepoDetailsPage;
