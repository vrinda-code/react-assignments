
import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const fallbackPhotos = [
  "photo-1470770841072-f978cf4d019e",
  "photo-1500530855697-b586d89ba3ee",
  "photo-1470252649378-9c29740c9fa8",
  "photo-1501785888041-af3ef285b470",
  "photo-1472214103451-9374bd1c798e",
  "photo-1441974231531-c6227db76b6e",
  "photo-1518837695005-2083093ee35b",
  "photo-1470071459604-3b5ec3a7fe05",
  "photo-1507525428034-b723cf961d3e",
  "photo-1464822759023-fed622ff2c3b",
];

function App() {
  const [photos, setPhotos] = useState([]);
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);

  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const bottomRef = useRef(null);

  const loadPhotos = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);
    setError("");

    try {
      let data;

      if (!usingFallback) {
        try {
          const response = await fetch(
            `https://picsum.photos/v2/list?page=${pageRef.current}`
          );

          if (!response.ok) throw new Error("Picsum unavailable");

          data = await response.json();

          if (!Array.isArray(data)) {
            throw new Error("Invalid response");
          }
        } catch {
          setUsingFallback(true);
          throw new Error("Switching to fallback");
        }
      }

      if (usingFallback) {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos?_page=${pageRef.current}&_limit=10`
        );

        if (!response.ok) throw new Error("Fallback API unavailable");

        const fallbackData = await response.json();

        data = fallbackData.map((photo) => ({
  id: `fallback-${photo.id}`,
  author: photo.title,
  download_url: photo.url,
}));
      }

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((previous) => [...previous, ...data]);
        pageRef.current += 1;
      }
    } catch (err) {
      if (err.message !== "Switching to fallback") {
        setError("Unable to load photos. Please try again.");
      }
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [hasMore, usingFallback]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadPhotos();
      },
      { rootMargin: "300px" }
    );

    const element = bottomRef.current;

    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [loadPhotos]);

  const handleLike = (id) => {
    setLikes((previous) => ({
      ...previous,
      [id]: (previous[id] || 0) + 1,
    }));
  };

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <h1>Photo Gallery</h1>
        <p>Discover beautiful photos from around the world</p>
        {usingFallback && (
          <small>Preview mode: using an alternative photo feed</small>
        )}
      </header>

      <main className="gallery-container">
        {photos.map((photo) => (
          <article className="photo-card" key={photo.id}>
            <img
              src={photo.download_url}
              alt={`Photo by ${photo.author}`}
              loading="lazy"
            />

            <div className="photo-details">
              <span className="photo-author">
                Photo by <strong>{photo.author}</strong>
              </span>

              <button
                className="like-button"
                onClick={() => handleLike(photo.id)}
                type="button"
                aria-label={`Like photo by ${photo.author}`}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{likes[photo.id] || 0}</span>
              </button>
            </div>
          </article>
        ))}

        <div ref={bottomRef} className="loading-area">
          {loading && <p>Loading more photos...</p>}

          {error && (
            <>
              <p>{error}</p>
              <button onClick={loadPhotos} type="button">Try again</button>
            </>
          )}

          {!hasMore && <p>You've reached the end of the gallery.</p>}
        </div>
      </main>
    </div>
  );
}

export default App;
