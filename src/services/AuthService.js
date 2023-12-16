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
                sessionStorage.setItem("user-id", responseData.id);
                sessionStorage.setItem("user-firstName", responseData.firstName);
                sessionStorage.setItem("user-lastName", responseData.lastName);
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
            if (!response.status === 200) {
                throw new Error('Logout failed. Please try again.');
            }
            sessionStorage.removeItem("access-token");
            sessionStorage.removeItem("user-id");
            sessionStorage.removeItem("user-firstName");
            sessionStorage.removeItem("user-lastName");
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    registerService: async (emailId, password, firstName, lastName, mobile) => {
        const url = 'http://localhost:8080/users/register';
        const data = {
            emailId,
            password,
            firstName,
            lastName,
            mobile
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