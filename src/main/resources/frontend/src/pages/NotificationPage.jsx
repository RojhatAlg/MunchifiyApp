import React from 'react';
import '../App.css';
import Navigation from '../components/Navigation';

function NotificationPage() {
  const message1= "like your post";
  const message2= "favorited your post";
  const message3 = "followed you"


  const notifications = [
    {
      id: 1,
      name: 'John Doe',
      image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      content: message1,
    },
    {
      id: 2,
      name: 'Jane Smith',
      image: 'https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg',
      content: message2,
    },
    {
      id: 3,
      name: 'Shepard',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxXnC3fwMwkbIt3ejGRIw3NmbDyUtgS5g2jA&usqp=CAU',
      content: message3,
    },
    {
      id: 4,
      name: 'Lars',
      image: 'https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154643.jpg',
      content: message3,
    },
  ];

  return (
    <div className="notification-page">
      <h1 class="heading">Notifications</h1>
      {notifications.map(notification => (
        <div key={notification.id} className="notification-item">
          <div className="notification-avatar">
            <div className="avatar-circle">
              <img src={notification.image} alt="Avatar" />
            </div>
            <span className="notification-name">{notification.name}</span>
          </div>
          <div className="notification-content">{notification.content}</div>
        </div>
      ))}

       {/* Bottom Navigation */}
       <Navigation />
    </div>
  );
}

export default NotificationPage;
