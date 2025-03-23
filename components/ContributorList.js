import React from 'react';

const ContributorList = ({ contributors }) => {
  return (
    <ul className="contributor-list">
      {contributors.map((c) => (
        <li key={c.id}>
          <img src={c.avatar_url} alt={c.login} width={32} height={32} />
          <a href={c.html_url} target="_blank" rel="noopener noreferrer">{c.login}</a>
          <span>Commits: {c.contributions}</span>
        </li>
      ))}
    </ul>
  );
};

export default ContributorList;
