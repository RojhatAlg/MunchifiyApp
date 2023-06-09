import logo from "./logo.svg";
import "./App.css";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

import notificationService from "./services/notificationService";
import addNotification from "react-push-notification";
import notificationServer from "./services/notificationServer";

function App() {
  const clickToNotify = async () => {
    const response = await axios.post("/api/likes", {
      // Provide necessary data for the like notification
      title: "like",
      message: "Kosta liked your picture",
      duration: 4000,
      native: true,
      pictureId: "123", // Replace with the actual picture ID
    });

    if (response.status === 200) {
      // Notification sent successfully
      console.log("Notification sent!");
    } else {
      // Notification failed to send
      console.log("Failed to send notification.");
    }
  };

  useEffect(() => {
    // Subscribe to the like notification service
    const subscribeToLikes = async () => {
      const notifications =
        await notificationService.notificationServiceLikes.getNotifications();
      notifications.forEach((notification) => {
        console.log(
          `You have a new like on your picture: ${notification.pictureId}`
        );
        // Handle the like notification as desired
      });
    };

    subscribeToLikes(); // Fetch initial notifications

    // Set up periodic polling to check for new notifications (e.g., every 5 seconds)
    const pollInterval = setInterval(subscribeToLikes, 5000);

    return () => {
      clearInterval(pollInterval); // Clean up the interval on component unmount
    };
  }, []);

  return (
    <div>
      <button onClick={clickToNotify} style={{ margin: "100px" }}>
        Click to notify
      </button>
    </div>
  );
}

export default App;

// function App() {
//   const clickToNotify = () => {
//     addNotification({
//       title: "like",
//       message: "Kosta liked your picture",
//       duration: 4000,
//       native: true,
//       onClick: () =>
//         window.location("Url til hvilket bilde som har blitt likt."),
//     });
//   };
//   return (
//     <div>
//       <button onClick={clickToNotify} style={{ margin: "100px" }}>
//         Click to notify
//       </button>
//     </div>
//   );
// }

// export default App;
