// import axios from "axios";

// const notificationServiceLikes = {
//   getNotifications: async () => {
//     const response = await axios.get("/api/likes");
//     return response.data;
//   },
//   notifyLikes: async () => {
//     const notifications =
//       await notificationService.notificationServiceLikes.getNotifications();
//     notifications.forEach((notification) => {
//       console.log(
//         `You have a new like on your picture: ${notification.pictureId}`
//       );
//     });
//   },
// };

// const notificationServiceComments = {
//   getNotifications: async () => {
//     const response = await axios.get("/api/Comments");
//     return response.data;
//   },
// };

// const notificationServiceFollowers = {
//   getNotifications: async () => {
//     const response = await axios.get("/api/followers");
//     return response.data;
//   },
// };
// return {
//   notificationServiceLikes,
//   notificationServiceComments,
//   notificationServiceFollowers,
// };

// export default notificationService;

import axios from "axios";

const notificationService = {
  notificationServiceLikes: {
    getNotifications: async () => {
      const response = await axios.get("/api/likes");
      return response.data;
    },
    notifyLikes: async () => {
      const notifications =
        await notificationService.notificationServiceLikes.getNotifications();
      notifications.forEach((notification) => {
        console.log(
          `You have a new like on your picture: ${notification.pictureId}`
        );
      });
    },
  },
  notificationServiceComments: {
    getNotifications: async () => {
      const response = await axios.get("/api/comments");
      return response.data;
    },
    notifyComments: async () => {
      const notifications =
        await notificationService.notificationServiceComments.getNotifications();
      notifications.forEach((notification) => {
        console.log(
          `You have a new comment on your picture: ${notification.pictureId}`
        );
      });
    },
  },
  notificationServiceFollowers: {
    getNotifications: async () => {
      const response = await axios.get("/api/followers");
      return response.data;
    },
    notifyFollowers: async () => {
      const notifications =
        await notificationService.notificationServiceFollowers.getNotifications();
      notifications.forEach((notification) => {
        console.log(`You have a new follower: ${notification.FollowersId}`);
      });
    },
  },
};

export default notificationService;
