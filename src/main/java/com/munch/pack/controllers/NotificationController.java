package com.munch.pack.controllers;

import com.munch.pack.dao.NotificationDao;
import com.munch.pack.entities.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationDao notificationDao;

    @Autowired
    public NotificationController(NotificationDao notificationDao) {
        this.notificationDao = notificationDao;
    }

    @GetMapping("/{userId}")
    public List<Notification> getNotificationsByUserId(@PathVariable long userId) throws SQLException {
        return notificationDao.getNotificationsByUserId(userId);
    }

    @PostMapping
    public void addNotification(@RequestBody Notification notification) throws SQLException {
        notificationDao.addNotification(notification);
    }

    @PutMapping("/{notificationId}")
    public void markNotificationAsRead(@PathVariable long notificationId) throws SQLException {
        notificationDao.markNotificationAsRead(notificationId);
    }
}
