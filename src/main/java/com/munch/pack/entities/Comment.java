package com.munch.pack.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Comment {
    private Long id;
    private String text;
    private Long userId;

    private long postId;
    private Date date;

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    private String profilePicture;
    private List<Reply> replies;

    public Comment(Long id, String text, Long userId, Long postId, Date date, String profilePicture) {
        this.id = id;
        this.text = text;
        this.userId = userId;
        this.postId = postId;
        this.date = date;
        this.profilePicture = profilePicture;
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

    public Long getPostId() {
        return postId;
    }

    public void setName(Long postId) {
        this.postId = postId;
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
