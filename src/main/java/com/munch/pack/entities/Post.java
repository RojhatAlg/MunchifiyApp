package com.munch.pack.entities;

public class Post {
    public Post(long id, long userId, long likesId, long commentId, long favouriteId, String bio, String photo, String NrLikes, String NrFavourites) {
        this.id = id;
        UserId = userId;
        LikesId = likesId;
        CommentId = commentId;
        FavouriteId = favouriteId;
        this.bio = bio;
        this.photo = photo;
        this.NrLikes = NrLikes;
        this.NrFavourites = NrFavourites;

    }

    private long id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return UserId;
    }

    public void setUserId(long userId) {
        UserId = userId;
    }

    public long getLikesId() {
        return LikesId;
    }

    public void setLikesId(long likesId) {
        LikesId = likesId;
    }

    public long getCommentId() {
        return CommentId;
    }

    public void setCommentId(long commentId) {
        CommentId = commentId;
    }

    public long getFavouriteId() {
        return FavouriteId;
    }

    public void setFavouriteId(long favouriteId) {
        FavouriteId = favouriteId;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    private long UserId;
    private long LikesId;
    private long CommentId;
    private long FavouriteId;
    private String bio;
    private String photo;

    public String getNrLikes() {
        return NrLikes;
    }

    public void setNrLikes(String nrLikes) {
        NrLikes = nrLikes;
    }

    public String getNrFavourites() {
        return NrFavourites;
    }

    public void setNrFavourites(String nrFavourites) {
        NrFavourites = nrFavourites;
    }

    private String NrLikes;

    private String NrFavourites;

}
