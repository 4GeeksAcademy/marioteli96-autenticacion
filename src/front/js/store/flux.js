const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			signUp: async (email, password, navigate) => {
                setStore({ loading: true }); // Indica que se está realizando una operación
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (response.ok) {
                        console.log("User successfully registered.");
                        // navigate("/login"); // Redirige al usuario a la página de inicio de sesión
                    } else {
                        const errorData = await response.json(); // Captura detalles del error
                        console.log("Failed to register user:", errorData);
                        alert(errorData.message || "Registration failed. Please try again.");
                    }
                } catch (error) {
                    console.error("Error in signUp:", error);
                    alert("An error occurred during registration. Please try again later.");
                } finally {
                    setStore({ loading: false }); // Finaliza el estado de carga
                }
            },
			logIn: async (email, password, navigate) => {
                setStore({ loading: true }); 
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setStore({ token: data.token, user: data.user, loading: false }); 
                        localStorage.setItem("token", data.token)
                        console.log("User successfully logged in.");
                        navigate("/privado"); 
                    } else {
                        const errorData = await response.json(); 
                        alert(errorData.message || "Invalid credentials. Please try again.");
                        setStore({ loading: false });
                    }
                } catch (error) {
                    console.error("Error in logIn:", error);
                    alert("An error occurred during login. Please try again later.");
                    setStore({ loading: false });
                }
            },
			logOut: (navigate) => {
                setStore({ token: null, user: null }); // Limpia el token y los datos del usuario
                localStorage.removeItem("token")
                console.log("User logged out.");
                navigate("/")
            },
			getPrivateData: async () => {
                const store = getStore();
                if (!localStorage.getItem("token")) {
                    console.log("No token found. User is not authenticated.");
                    return;
                }

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/private`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log("Private data fetched:", data);
                        return data;
                    } else {
                        const errorData = await response.json(); // Captura detalles del error
                        console.log("Failed to fetch private data:", errorData);
                    }
                } catch (error) {
                    console.error("Error in getPrivateData:", error);
                }
            },


			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
