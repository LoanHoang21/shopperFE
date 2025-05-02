import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { RootStackParamList } from "../types/data";

const AdminRouter = (props: any) => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    
    useEffect(() => {

    }, []);
    return (
        <>
        <Stack.Screen
            name={props.name}
            component={props.component}
        />
        </>
    );
};
export default AdminRouter;