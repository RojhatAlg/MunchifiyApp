package com.munch.pack;

public class Comment {
    private Long id;
    private String text;
    private Long userId;

    private String name;

    public Comment() {
    }

    public Comment(Long id, String text, Long userId, String name) {
        this.id = id;
        this.text = text;
        this.userId = userId;
        this.name = name;
    }

    // Getters and setters

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

    public String getName(){ return name; }

    public void setName(String name){ this.name = name; }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                "username=" + name +
                ", text='" + text + '\'' +
                ", userId=" + userId +
                '}';
    }

}
