import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
	children: JSX.Element;
	isAuthenticated: boolean;
}

export default function PrivateRoute({ children, isAuthenticated }: PrivateRouteProps) {
	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}
	return children;
}
