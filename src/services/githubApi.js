const GITHUB_API_BASE = "https://api.github.com";

class GitHubApiService {
  async fetchUser(username) {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
      if (!response.ok) {
        throw new Error(`User not found: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  async fetchUserRepos(username, perPage = 10) {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${perPage}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch repositories: ${error.message}`);
    }
  }

  async fetchUserEvents(username) {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${username}/events/public?per_page=10`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch user events: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch user events: ${error.message}`);
    }
  }

  async searchUsers(query, perPage = 10) {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/search/users?q=${query}&per_page=${perPage}`
      );
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Search failed: ${error.message}`);
    }
  }
}

export default new GitHubApiService();
