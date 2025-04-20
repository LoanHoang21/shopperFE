import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";

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