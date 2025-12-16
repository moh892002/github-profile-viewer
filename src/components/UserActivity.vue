<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          Error Loading Activity
        </h3>
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Activity Content -->
      <div v-else-if="activities.length > 0">
        <!-- Header -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">Activity</h1>
                <p class="text-gray-600">
                  {{ activities.length }} recent activities
                </p>
              </div>

              <!-- Filter Options -->
              <div class="flex items-center space-x-4">
                <label for="filter" class="text-sm font-medium text-gray-700"
                  >Filter by:</label
                >
                <select
                  id="filter"
                  v-model="activityFilter"
                  class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Activities</option>
                  <option value="PushEvent">Push Events</option>
                  <option value="CreateEvent">Create Events</option>
                  <option value="ForkEvent">Fork Events</option>
                  <option value="WatchEvent">Star Events</option>
                  <option value="PullRequestEvent">Pull Request Events</option>
                  <option value="IssuesEvent">Issue Events</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Timeline -->
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div class="flow-root">
            <ul role="list" class="-mb-8">
              <li
                v-for="(activity, activityIdx) in filteredActivities"
                :key="activity.id"
              >
                <div
                  class="relative pb-8"
                  :class="{
                    'pb-0': activityIdx === filteredActivities.length - 1,
                  }"
                >
                  <span
                    v-if="activityIdx !== filteredActivities.length - 1"
                    class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  ></span>
                  <div class="relative flex space-x-3 px-6">
                    <div>
                      <span
                        class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                        :class="getEventIconBg(activity.type)"
                      >
                        <component
                          :is="getEventIcon(activity.type)"
                          class="h-4 w-4 text-white"
                        />
                      </span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="text-sm">
                        <div class="font-medium text-gray-900">
                          {{ getActivityDescription(activity) }}
                        </div>
                        <div class="mt-1 text-gray-500">
                          <span class="font-medium">{{
                            activity.actor?.login || "Unknown"
                          }}</span>
                          <span class="mx-1">•</span>
                          <time :datetime="activity.created_at">{{
                            formatRelativeTime(activity.created_at)
                          }}</time>
                        </div>
                      </div>

                      <!-- Activity Details -->
                      <div class="mt-3 text-sm text-gray-600">
                        <div
                          v-if="activity.payload?.size !== undefined"
                          class="flex items-center space-x-2"
                        >
                          <svg
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                            />
                          </svg>
                          <span
                            >Pushed {{ activity.payload.size }} commit{{
                              activity.payload.size === 1 ? "" : "s"
                            }}</span
                          >
                        </div>

                        <div
                          v-if="activity.payload?.ref"
                          class="flex items-center space-x-2"
                        >
                          <svg
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <span
                            >Branch:
                            {{
                              activity.payload.ref?.replace("refs/heads/", "")
                            }}</span
                          >
                        </div>

                        <div
                          v-if="activity.payload?.description"
                          class="mt-2 p-3 bg-gray-50 rounded-md"
                        >
                          <p class="text-sm">
                            {{ activity.payload.description }}
                          </p>
                        </div>

                        <!-- Repository Link -->
                        <div v-if="activity.repo" class="mt-2">
                          <a
                            :href="`https://github.com/${activity.repo.name}`"
                            target="_blank"
                            rel="noopener"
                            class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          >
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
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              />
                            </svg>
                            {{ activity.repo.name }}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- No Activity -->
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No Recent Activity
        </h3>
        <p class="text-gray-600">
          This user doesn't have any public activity to display.
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

const activities = ref([]);
const loading = ref(true);
const error = ref("");
const activityFilter = ref("all");

const filteredActivities = computed(() => {
  if (activityFilter.value === "all") {
    return activities.value;
  }
  return activities.value.filter(
    (activity) => activity.type === activityFilter.value
  );
});

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  if (diffHours < 24)
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)} week${
      Math.floor(diffDays / 7) === 1 ? "" : "s"
    } ago`;
  if (diffDays < 365)
    return `${Math.floor(diffDays / 30)} month${
      Math.floor(diffDays / 30) === 1 ? "" : "s"
    } ago`;
  return `${Math.floor(diffDays / 365)} year${
    Math.floor(diffDays / 365) === 1 ? "" : "s"
  } ago`;
};

const getActivityDescription = (activity) => {
  const type = activity.type;
  const repoName = activity.repo?.name || "";

  switch (type) {
    case "PushEvent":
      return `Pushed to ${repoName}`;
    case "CreateEvent":
      return `Created ${repoName}`;
    case "ForkEvent":
      return `Forked ${repoName}`;
    case "WatchEvent":
      return `Starred ${repoName}`;
    case "PullRequestEvent":
      return `Pull request ${
        activity.payload?.action || "updated"
      } in ${repoName}`;
    case "IssuesEvent":
      return `Issue ${activity.payload?.action || "updated"} in ${repoName}`;
    case "ReleaseEvent":
      return `Released ${
        activity.payload?.release?.tag_name || "new version"
      } in ${repoName}`;
    case " GollumEvent":
      return `Edited wiki in ${repoName}`;
    default:
      return `${type.toLowerCase().replace("event", "")} ${repoName}`;
  }
};

const getEventIcon = (eventType) => {
  const icons = {
    PushEvent: "PushIcon",
    CreateEvent: "CreateIcon",
    ForkEvent: "ForkIcon",
    WatchEvent: "StarIcon",
    PullRequestEvent: "PullRequestIcon",
    IssuesEvent: "IssueIcon",
    ReleaseEvent: "ReleaseIcon",
    GollumEvent: "WikiIcon",
  };

  return icons[eventType] || "DefaultIcon";
};

const getEventIconBg = (eventType) => {
  const backgrounds = {
    PushEvent: "bg-green-500",
    CreateEvent: "bg-blue-500",
    ForkEvent: "bg-purple-500",
    WatchEvent: "bg-yellow-500",
    PullRequestEvent: "bg-indigo-500",
    IssuesEvent: "bg-red-500",
    ReleaseEvent: "bg-gray-500",
    GollumEvent: "bg-gray-400",
  };

  return backgrounds[eventType] || "bg-gray-500";
};

const fetchActivities = async () => {
  loading.value = true;
  error.value = "";

  try {
    activities.value = await githubApi.fetchUserEvents(username);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchActivities();
});

watch(
  () => route.params.username,
  () => {
    if (route.params.username) {
      fetchActivities();
    }
  }
);
</script>

<!-- Icon Components -->
<script>
export default {
  components: {
    PushIcon: {
      template: `
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      `,
    },
    CreateIcon: {
      template: `
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      `,
    },
    ForkIcon: {
      template: `
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      `,
    },
    StarIcon: {
      template: `
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      `,
    },
    PullRequestIcon: {
      template: `
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      `,
    },
    IssueIcon: {
      template: `
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      `,
    },
    ReleaseIcon: {
      template: `
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      `,
    },
    WikiIcon: {
      template: `
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      `,
    },
    DefaultIcon: {
      template: `
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
    },
  },
};
</script>
