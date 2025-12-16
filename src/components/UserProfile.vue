<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <h3 class="text-lg font-medium text-red-800 mb-2">User Not Found</h3>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="goHome"
          class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
        >
          Back to Search
        </button>
      </div>

      <!-- User Profile Content -->
      <div v-else-if="user" class="space-y-6">
        <!-- Back Navigation -->
        <button
          @click="goHome"
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
          Back to Search
        </button>

        <!-- User Header -->
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div class="px-6 py-8">
            <div class="flex items-center space-x-6">
              <div class="flex-shrink-0">
                <img
                  :src="user.avatar_url"
                  :alt="user.name || user.login"
                  class="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-4">
                  <div>
                    <h1 class="text-2xl font-bold text-gray-900">
                      {{ user.name || user.login }}
                    </h1>
                    <p v-if="user.name" class="text-gray-600 text-lg">
                      @{{ user.login }}
                    </p>
                    <p v-else class="text-gray-600">
                      {{ user.login }}
                    </p>
                  </div>
                </div>

                <div v-if="user.bio" class="mt-3">
                  <p class="text-gray-700">{{ user.bio }}</p>
                </div>

                <div class="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div v-if="user.location" class="flex items-center">
                    <svg
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {{ user.location }}
                  </div>
                  <div v-if="user.blog" class="flex items-center">
                    <svg
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <a
                      :href="user.blog"
                      target="_blank"
                      rel="noopener"
                      class="text-blue-600 hover:text-blue-800"
                    >
                      {{ user.blog }}
                    </a>
                  </div>
                  <div v-if="user.twitter_username" class="flex items-center">
                    <svg
                      class="h-4 w-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                      />
                    </svg>
                    @{{ user.twitter_username }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl font-bold text-gray-900">
                  {{ formatNumber(user.public_repos) }}
                </div>
                <div class="text-sm text-gray-600">Repositories</div>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl font-bold text-gray-900">
                  {{ formatNumber(user.public_gists) }}
                </div>
                <div class="text-sm text-gray-600">Gists</div>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl font-bold text-gray-900">
                  {{ formatNumber(user.followers) }}
                </div>
                <div class="text-sm text-gray-600">Followers</div>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl font-bold text-gray-900">
                  {{ formatNumber(user.following) }}
                </div>
                <div class="text-sm text-gray-600">Following</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-6 flex space-x-4">
              <a
                :href="user.html_url"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <svg
                  class="h-4 w-4 mr-2"
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
                View on GitHub
              </a>
              <router-link
                :to="`/user/${username}/repositories`"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                <svg
                  class="h-4 w-4 mr-2"
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
                View Repositories
              </router-link>
              <router-link
                :to="`/user/${username}/activity`"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
              >
                <svg
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                View Activity
              </router-link>
            </div>
          </div>
        </div>

        <!-- Preview Sections -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Recent Repositories Preview -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">
                Recent Repositories
              </h2>
            </div>
            <div class="p-6">
              <div v-if="reposLoading" class="flex justify-center py-4">
                <div
                  class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"
                ></div>
              </div>
              <div v-else-if="repos.length > 0" class="space-y-3">
                <div
                  v-for="repo in repos.slice(0, 3)"
                  :key="repo.id"
                  class="flex items-center justify-between"
                >
                  <div class="flex-1 min-w-0">
                    <a
                      :href="repo.html_url"
                      target="_blank"
                      rel="noopener"
                      class="text-sm font-medium text-blue-600 hover:text-blue-800 truncate block"
                    >
                      {{ repo.name }}
                    </a>
                    <p
                      v-if="repo.description"
                      class="text-xs text-gray-500 truncate"
                    >
                      {{ repo.description }}
                    </p>
                  </div>
                  <div
                    class="flex items-center space-x-2 text-xs text-gray-500"
                  >
                    <span v-if="repo.language">{{ repo.language }}</span>
                    <span
                      v-if="repo.stargazers_count > 0"
                      class="flex items-center"
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
                      {{ formatNumber(repo.stargazers_count) }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-4 text-gray-500">
                No repositories found
              </div>
              <div v-if="repos.length > 3" class="mt-4 text-center">
                <router-link
                  :to="`/user/${username}/repositories`"
                  class="text-sm text-blue-600 hover:text-blue-800"
                >
                  View all repositories →
                </router-link>
              </div>
            </div>
          </div>

          <!-- Recent Activity Preview -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
            </div>
            <div class="p-6">
              <div v-if="eventsLoading" class="flex justify-center py-4">
                <div
                  class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"
                ></div>
              </div>
              <div v-else-if="events.length > 0" class="space-y-3">
                <div
                  v-for="event in events.slice(0, 3)"
                  :key="event.id"
                  class="text-sm"
                >
                  <div class="flex items-center space-x-2">
                    <span class="font-medium text-gray-900">{{
                      getEventActor(event)
                    }}</span>
                    <span class="text-gray-600">{{
                      getEventDescription(event)
                    }}</span>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    {{ formatDate(event.created_at) }}
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-4 text-gray-500">
                No recent activity
              </div>
              <div v-if="events.length > 3" class="mt-4 text-center">
                <router-link
                  :to="`/user/${username}/activity`"
                  class="text-sm text-blue-600 hover:text-blue-800"
                >
                  View all activity →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import githubApi from "../services/githubApi";

const route = useRoute();
const router = useRouter();
const username = route.params.username;

const user = ref(null);
const repos = ref([]);
const events = ref([]);
const loading = ref(true);
const reposLoading = ref(false);
const eventsLoading = ref(false);
const error = ref("");

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num?.toString() || "0";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

const getEventActor = (event) => {
  return event.actor?.login || "Unknown";
};

const getEventDescription = (event) => {
  const type = event.type;
  const repoName = event.repo?.name || "";

  switch (type) {
    case "PushEvent":
      return `pushed to ${repoName}`;
    case "CreateEvent":
      return `created ${repoName}`;
    case "ForkEvent":
      return `forked ${repoName}`;
    case "WatchEvent":
      return `starred ${repoName}`;
    default:
      return `${type.toLowerCase().replace("event", "")} ${repoName}`;
  }
};

const goHome = () => {
  router.push("/");
};

const fetchUserData = async () => {
  loading.value = true;
  error.value = "";

  try {
    user.value = await githubApi.fetchUser(username);
    await Promise.all([fetchRepos(), fetchEvents()]);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const fetchRepos = async () => {
  reposLoading.value = true;
  try {
    repos.value = await githubApi.fetchUserRepos(username, 5);
  } catch (err) {
    console.error("Failed to fetch repos:", err);
  } finally {
    reposLoading.value = false;
  }
};

const fetchEvents = async () => {
  eventsLoading.value = true;
  try {
    events.value = await githubApi.fetchUserEvents(username);
  } catch (err) {
    console.error("Failed to fetch events:", err);
  } finally {
    eventsLoading.value = false;
  }
};

onMounted(() => {
  fetchUserData();
});

watch(
  () => route.params.username,
  () => {
    if (route.params.username) {
      fetchUserData();
    }
  }
);
</script>
