import {
    Navigate
} from "react-router-dom";
import { getCookie } from "./function";
function PrivateRoute({ children }) {
    const auth = getCookie("dataUser")
    return auth ? children : <Navigate to="/login" />;
}
export default PrivateRoute