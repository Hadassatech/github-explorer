import React, { useMemo } from 'react';
import Link from 'next/link';

const RepoList = ({ repos, sortByStars, onRepoClick }) => {
  // Sort only if sortByStars is true, otherwise return as is
  const displayRepos = useMemo(() => {
    return sortByStars
      ? [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)
      : repos;
  }, [repos, sortByStars]);

  return (
    <div className="repo-list">
      {displayRepos.map((repo) => (
        <Link
          key={repo.id}
          href={`/repo/${repo.owner.login}/${repo.name}`}
          onClick={onRepoClick}
        >
          <div className="repo-card">
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <div className="repo-meta">
              <span>⭐ {repo.stargazers_count}</span>
              <span>💻 {repo.language}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RepoList;

