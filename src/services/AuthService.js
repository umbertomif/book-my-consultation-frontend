const authService = {

    loginService: async (email, password) => {
        const userCredentials = window.btoa(email + ":" + password);
        const headers = {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            authorization: "Basic " + userCredentials,
        };
        const url = 'http://localhost:8080/auth/login';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers
            });
            if (!response.ok) {
                throw new Error('Login failed. Please try again.');
            }
            const responseData = await response.json();
            if (responseData) {
                sessionStorage.setItem("access-token", responseData.accessToken);
                return true;
            } else {
                throw new Error('Login failed. Please try again.');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    logoutService: async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + sessionStorage.getItem("access-token"),
        };
        const url = 'http://localhost:8080/auth/logout';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers
            });
            if (!response.ok) {
                throw new Error('Logout failed. Please try again.');
            }
            const responseData = await response.json();
            if (responseData) {
                sessionStorage.removeItem("access-token");
                return true;
            } else {
                throw new Error('Logout failed. Please try again.');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    registerService: async (emailId, password, firstName, lastName, mobile, dob) => {
        const url = 'http://localhost:8080/users/register';
        const data = {
            emailId,
            password,
            firstName,
            lastName,
            mobile,
            dob
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Register failed. Please try again.');
            }
            return response.ok;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default authService;