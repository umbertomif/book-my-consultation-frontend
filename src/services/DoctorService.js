const doctorService = {

    getDoctorsList: async () => {
        const url = 'http://localhost:8080/doctors';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
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

    getSpeciality: async () => {
        const url = 'http://localhost:8080/doctors/speciality';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
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

    getFilteredDoctors: async (speciality) => {
        const url = 'http://localhost:8080/doctors?speciality=' + encodeURI(speciality);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
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

    getAvailableSlots: async (doctorId, date) => {
        const url = `http://localhost:8080/doctors/${doctorId}/timeSlots?date=${date}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
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

export default doctorService;