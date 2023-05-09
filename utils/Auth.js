import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const accessToken = useSelector((state) => state.isLoadingReducer.token);
      // const accessToken = localStorage.getItem('token')

      // If there is no access token we redirect to "/" page.
      if (accessToken == '') {
        Router.replace("/");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;