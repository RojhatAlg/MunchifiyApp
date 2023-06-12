package com.munch.pack.entities;

import java.util.Date;

public class Reply {
    private Long id;
    private String text;
    private Long commentId;
    private Date date;
    private Long userId;

    public Reply(Long id, String text, Long commentId, Date date, Long userId) {
        this.id = id;
        this.text = text;
        this.commentId = commentId;
        this.date = date;
        this.userId = userId;
    }

    // Getters and setters for the properties

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
