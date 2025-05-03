Step 1: The review is created with a specific rating.

Step 2: After the review is created, we fetch all the reviews for the game using the gameId.

Step 3: The average rating is calculated by summing the rating values of all reviews and dividing by the total number of reviews.

Step 4: The rating field in the Game model is updated with the new average rating, rounded to the nearest integer.

Considerations:
Performance: If a game has many reviews, calculating the average rating every time might become inefficient. In such cases, you can consider using a database trigger to handle the average calculation automatically on insert/update/delete operations.

Handling Deleted Reviews: If a review is deleted, the rating field of the game should also be recalculated to account for the missing rating. Make sure to handle this when deleting or updating reviews.
