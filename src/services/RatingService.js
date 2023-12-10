const ratingService = {

    ratings: async (appointmentId, doctorId, rating, comments) => {
        const url = 'http://localhost:8080/ratings';
        const data = {
            appointmentId,
            doctorId,
            rating,
            comments
        };
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