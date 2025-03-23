// utils/github.js
import axios from 'axios';

const GITHUB_API = 'https://api.github.com';
const AUTH_HEADER = {
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
};

// Fetch repositories for a specific user
export const fetchUserRepos = async (username, page = 1, perPage = 10, sort = 'updated') => {
  const { data } = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
    params: { per_page: perPage, page, sort },
    ...AUTH_HEADER,
  });
  return data;
};

// Fetch repository details
export const fetchRepoDetails = async (user, repo) => {
  const { data } = await axios.get(`${GITHUB_API}/repos/${user}/${repo}`, AUTH_HEADER);
  return data;
};

// Fetch top contributors
export const fetchContributors = async (user, repo, perPage = 5) => {
  const { data } = await axios.get(`${GITHUB_API}/repos/${user}/${repo}/contributors`, {
    params: { per_page: perPage },
    ...AUTH_HEADER,
  });
  return data;
};
