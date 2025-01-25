import React from "react";

interface VideoEmbedProps {
    url: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ url }) => {
    const getEmbedCode = (url: string) => {
        // Common height and width style
        const embedStyle = {
            width: "100%",
            height: "100%",
        };

        // YouTube
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
            return (
                <iframe
                    style={embedStyle}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
            );
        }

        // Facebook
        if (url.includes("facebook.com")) {
            return (
                <div
                    className="fb-video"
                    style={embedStyle}
                    data-href={url}
                    data-width="500"
                    data-show-text="false"
                ></div>
            );
        }

        // Instagram
        if (url.includes("instagram.com")) {
            return (
                <blockquote
                    className="instagram-media"
                    style={{ ...embedStyle, minHeight: "100%" }}
                    data-instgrm-permalink={url}
                    data-instgrm-version="14"
                >
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        View this post on Instagram
                    </a>
                </blockquote>
            );
        }

        // Unsupported or fallback
        return (
            <p>
                Unsupported video platform.{" "}
                <a href={url} target="_blank" rel="noopener noreferrer">
                    View Video
                </a>
            </p>
        );
    };

    React.useEffect(() => {
        // Load Facebook and Instagram SDKs if required
        if (url.includes("facebook.com")) {
            if (!document.getElementById("facebook-jssdk")) {
                const script = document.createElement("script");
                script.id = "facebook-jssdk";
                script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0";
                document.body.appendChild(script);
            }
        }

        if (url.includes("instagram.com")) {
            if (!document.getElementById("instagram-embed")) {
                const script = document.createElement("script");
                script.id = "instagram-embed";
                script.src = "//www.instagram.com/embed.js";
                document.body.appendChild(script);
            } else {
                // Re-initialize Instagram embeds if already loaded
                (window as any).instgrm?.Embeds.process();
            }
        }
    }, [url]);

    return (
        <div
            style={{
                height: "620px", // Consistent height for all embeds
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f9f9f9", // Optional background for better visibility
            }}
        >
            {getEmbedCode(url)}
        </div>
    );
};

export default VideoEmbed;
