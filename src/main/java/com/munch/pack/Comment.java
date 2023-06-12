package com.munch.pack;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Comment {
    private Long id;
    private String text;
    private Long userId;
    private String name;
    private Date date;
    private List<Reply> replies;

    public Comment(Long id, String text, Long userId, String name, Date date) {
        this.id = id;
        this.text = text;
        this.userId = userId;
        this.name = name;
        this.date = date;
        this.replies = new ArrayList<>();
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<Reply> getReplies() {
        return replies;
    }

    public void addReply(Reply reply) {
        replies.add(reply);
    }
}
