<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          GitHub Profile Viewer
          by Mohammed S Bader
        </h1>
        <p class="text-gray-600 mb-8">
          Search for any GitHub user to view their profile, repositories, and
          activity
        </p>
      </div>

      <form @submit.prevent="handleSearch" class="space-y-6">
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            GitHub Username
          </label>
          <div class="relative">
            <input
              v-model="username"
              type="text"
              id="username"
              name="username"
              required
              class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter GitHub username..."
              :disabled="loading"
            />
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              v-if="loading"
            >
              <svg
                class="animate-spin h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading || !username.trim()"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {{ loading ? "Searching..." : "Search Profile" }}
          </button>
        </div>
      </form>

      <div
        v-if="error"
        class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <div class="mt-2 text-sm text-red-700">
              {{ error }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="searchHistory.length > 0" class="mt-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Searches</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="user in searchHistory"
            :key="user"
            @click="username = user"
            class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {{ user }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import githubApi from "../services/githubApi";

const router = useRouter();
const username = ref("");
const loading = ref(false);
const error = ref("");
const searchHistory = ref([]);

const handleSearch = async () => {
  if (!username.value.trim()) return;

  loading.value = true;
  error.value = "";

  try {
    // Test if user exists
    await githubApi.fetchUser(username.value.trim());

    // Add to search history
    const trimmedUsername = username.value.trim();
    const history = JSON.parse(
      localStorage.getItem("github-search-history") || "[]"
    );
    const updatedHistory = [
      trimmedUsername,
      ...history.filter((h) => h !== trimmedUsername),
    ].slice(0, 5);
    localStorage.setItem(
      "github-search-history",
      JSON.stringify(updatedHistory)
    );
    searchHistory.value = updatedHistory;

    // Navigate to user profile
    router.push(`/user/${trimmedUsername}`);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Load search history on component mount
searchHistory.value = JSON.parse(
  localStorage.getItem("github-search-history") || "[]"
);
</script>
