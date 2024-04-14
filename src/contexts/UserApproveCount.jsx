import React, { createContext, useContext, useState } from "react";

const UserApproveCountContext = createContext();

export const useUserApproveCount = () => useContext(UserApproveCountContext);

export const UserApproveCountProvider = ({ children }) => {
    const [userApproveCount, setUserApproveCount] = useState(0);

    const fetchUsers = async () => {
        try {
            const response = await instance.get('/users/approve', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setUserApproveCount(response.data.length);
            }
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/entrar');
            }
        }
    }

    React.useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UserApproveCountContext.Provider value={{ userApproveCount, setUserApproveCount }}>
            {children}
        </UserApproveCountContext.Provider>
    );
}