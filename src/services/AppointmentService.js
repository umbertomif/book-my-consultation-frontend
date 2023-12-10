const ratingService = {

    bookAppointment: async (
        doctorId,
        doctorName,
        userId,
        userName,
        userEmailId,
        timeSlot,
        appointmentDate,
        createdDate,
        symptoms,
        priorMedicalHistory
    ) => {
        const url = 'http://localhost:8080/appointments';
        const data = {
            doctorId,
            doctorName,
            userId,
            userName,
            userEmailId,
            timeSlot,
            appointmentDate,
            createdDate,
            symptoms,
            priorMedicalHistory,
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
                throw new Error('Book Appointment failed. Please try again.');
            }
            return response.ok;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getUserAppointments: async (emailId) => {
        const url = `http://localhost:8080/users/${emailId}/appointments`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + sessionStorage.getItem("access-token"),
        };
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
            });
            if (!response.ok) {
                throw new Error('Get failed. Please try again.');
            }
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            throw new Error('Get failed. Please try again.');
        }
    },
}

export default ratingService;