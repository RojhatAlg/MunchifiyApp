package com.munch.pack.entities;

import java.time.LocalDateTime;

public class Notification {
    public Notification() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    private long id;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public Notification(long id, long userId, String message, LocalDateTime time, boolean isRead) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.time = time;
        this.isRead = isRead;
    }

    private long userId;
    private String message;
    private LocalDateTime time;
    private boolean isRead;
}
