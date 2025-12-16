<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back Navigation -->
      <div class="mb-6">
        <router-link
          :to="`/user/${username}`"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <svg
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Profile
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-md p-6 text-center"
      >
        <div class="flex justify-center">
          <svg
            class="h-12 w-12 text-red-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-red-800 mb-2">
          Error Loading Repositories
        </h3>
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Repositories Content -->
      <div v-else-if="repositories.length > 0">
        <!-- Header -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">Repositories</h1>
                <p class="text-gray-600">
                  {{ repositories.length }} repositories found
                </p>
              </div>

              <!-- Sort Options -->
              <div class="flex items-center space-x-4">
                <label for="sort" class="text-sm font-medium text-gray-700"
                  >Sort by:</label
                >
                <select
                  id="sort"
                  v-model="sortBy"
                  @change="sortRepositories"
                  class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="updated">Recently Updated</option>
                  <option value="stars">Most Stars</option>
                  <option value="name">Name</option>
                  <option value="created">Recently Created</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Repository Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="repo in sortedRepositories"
            :key="repo.id"
            class="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div class="p-6">
              <!-- Repository Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-semibold text-gray-900 truncate">
                    <a
                      :href="repo.html_url"
                      target="_blank"
                      rel="noopener"
                      class="hover:text-blue-600 transition-colors duration-200"
                    >
                      {{ repo.name }}
                    </a>
                  </h3>
                  <p
                    v-if="repo.description"
                    class="text-sm text-gray-600 mt-1 line-clamp-2"
                  >
                    {{ repo.description }}
                  </p>
                </div>
                <div class="flex-shrink-0 ml-4">
                  <span
                    v-if="repo.private"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                  >
                    Private
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    Public
                  </span>
                </div>
              </div>

              <!-- Repository Stats -->
              <div
                class="flex items-center justify-between text-sm text-gray-500 mb-4"
              >
                <div class="flex items-center space-x-4">
                  <div v-if="repo.language" class="flex items-center">
                    <div
                      class="w-3 h-3 rounded-full mr-2"
                      :style="{
                        backgroundColor: getLanguageColor(repo.language),
                      }"
                    ></div>
                    <span>{{ repo.language }}</span>
                  </div>
                  <div
                    v-if="repo.stargazers_count > 0"
                    class="flex items-center"
                  >
                    <svg
                      class="h-4 w-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <span>{{ formatNumber(repo.stargazers_count) }}</span>
                  </div>
                  <div v-if="repo.forks_count > 0" class="flex items-center">
                    <svg
                      class="h-4 w-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>{{ formatNumber(repo.forks_count) }}</span>
                  </div>
                  <div
                    v-if="repo.open_issues_count > 0"
                    class="flex items-center"
                  >
                    <svg
                      class="h-4 w-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>{{ formatNumber(repo.open_issues_count) }}</span>
                  </div>
                </div>
              </div>

              <!-- Repository Footer -->
              <div
                class="flex items-center justify-between pt-4 border-t border-gray-200"
              >
                <div class="text-xs text-gray-500">
                  Updated {{ formatDate(repo.updated_at) }}
                </div>
                <div class="flex space-x-2">
                  <a
                    :href="repo.html_url"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg
                      class="h-3 w-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View
                  </a>
                  <a
                    :href="`${repo.html_url}/stargazers`"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg
                      class="h-3 w-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    Stars
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-8 flex justify-center">
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              v-if="currentPage > 1"
              @click="changePage(currentPage - 1)"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="changePage(page)"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                page === currentPage
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>
            <button
              v-if="currentPage < totalPages"
              @click="changePage(currentPage + 1)"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Next
            </button>
          </nav>
        </div>
      </div>

      <!-- No Repositories -->
      <div v-else class="bg-white shadow rounded-lg p-12 text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No Repositories Found
        </h3>
        <p class="text-gray-600">
          This user doesn't have any public repositories.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import githubApi from "../services/githubApi";

const route = useRoute();
const username = route.params.username;

const repositories = ref([]);
const loading = ref(true);
const error = ref("");
const sortBy = ref("updated");
const currentPage = ref(1);
const itemsPerPage = 12;

// Language color mapping
const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#239120",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#fa7343",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Vue: "#4FC08D",
  React: "#61DAFB",
  HTML: "#e34c26",
  CSS: "#1572B6",
  Shell: "#89e051",
  PowerShell: "#012456",
};

const sortedRepositories = computed(() => {
  const repos = [...repositories.value];

  switch (sortBy.value) {
    case "stars":
      return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    case "name":
      return repos.sort((a, b) => a.name.localeCompare(b.name));
    case "created":
      return repos.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    case "updated":
    default:
      return repos.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
  }
});

const totalPages = computed(() =>
  Math.ceil(repositories.value.length / itemsPerPage)
);

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, currentPage.value + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num?.toString() || "0";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

const getLanguageColor = (language) => {
  return languageColors[language] || "#6B7280";
};

const fetchRepositories = async () => {
  loading.value = true;
  error.value = "";

  try {
    repositories.value = await githubApi.fetchUserRepos(username, 100);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const sortRepositories = () => {
  // Sorting is handled by the computed property
};

const changePage = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  fetchRepositories();
});

watch(
  () => route.params.username,
  () => {
    if (route.params.username) {
      fetchRepositories();
    }
  }
);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
