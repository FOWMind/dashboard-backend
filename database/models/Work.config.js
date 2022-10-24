const workConfig = {
  collection: "Work",
  schema: {
    date: {
      type: Date,
      default: Date.now,
    },
    editAt: {
      type: Date,
      default: Date.now,
    },
    title: String,
    editedTitle: String,
    category: String,
    slug: String,
    repository: {
      url: {
        type: String,
        lowercase: true,
      },
      demoUrl: {
        type: String,
        lowercase: true,
      },
    },
    featuredImage: {},
    featuredImageRaw: String,
    images: [
      {
        type: String,
        required: true,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
    notes: [
      {
        type: String,
      },
    ],
  },
};

module.exports = workConfig;
