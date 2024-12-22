import React from "react";

const PostImages = ({ images }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className="post-images">
            {images.map((image) => (
                <img
                    key={image.id}
                    src={image.url}
                    alt="Thumbnail"
                    className="post-thumbnail"
                />
            ))}
        </div>
    );
};

export default PostImages;
