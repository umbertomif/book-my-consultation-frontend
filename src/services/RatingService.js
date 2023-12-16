const ratingService = {

    ratings: async (data) => {
        const url = 'http://localhost:8080/ratings';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + sessionStorage.getItem("access-token"),
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Ratings failed. Please try again.');
            }
            return response.ok;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default ratingService;