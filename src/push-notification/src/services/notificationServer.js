import notificationService from "./notificationService";

const notificationServer = {
  getNotifications: async () => {
    const response = await notificationService.getNotifications();
    return response.data;
  },
};

export default notificationServer;
