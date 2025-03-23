import React from 'react';

const RepoCard = ({ repo }) => {
  return (
    <div className="repo-card">
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <div className="repo-meta">
        <span>{repo.stargazers_count}</span>
        <span>{repo.language}</span>
      </div>
    </div>
  );
};

export default RepoCard;
