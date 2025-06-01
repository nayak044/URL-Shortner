WITH AvailableBooks AS (
    SELECT bookId, genre, ROW_NUMBER() OVER(PARTITION BY genre ORDER BY bookId) AS rn
    FROM Books
    WHERE status = 'Available'
),
UserRecommendations AS (
    SELECT u.userId, u.name, ab.bookId, ROW_NUMBER() OVER(ORDER BY u.userId) AS u_rn
    FROM Users u
    LEFT JOIN AvailableBooks ab ON u.genrePreference = ab.genre
)
SELECT userId, name, 
       (SELECT bookId FROM UserRecommendations WHERE u_rn = ur.u_rn ORDER BY bookId LIMIT 1) as bookId
FROM UserRecommendations ur
GROUP BY userId, name;