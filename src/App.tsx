import { Fragment, useEffect, useLayoutEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "./theme";
import NavBar from "./Components/navbar/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { appStarted, loadingSelector } from "./store/dataSlice";
import { Stack, CircularProgress } from "@mui/material";
import Footer from "./Components/home/footer";
import ItemDetails from "./pages/itemDetails";
import ScrollToTop from "./helper/scrolToTop";
import Shop from "./pages/shop";
import NotFound from "./pages/notFound";
import Notifications from "./Components/notifications/notifications";
import Checkout from "./pages/checkout";

function App() {
  const isLoading: boolean = useAppSelector(loadingSelector);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(appStarted());
  }, []);
  return (
    <Fragment>
      <ScrollToTop />
      <ThemeProvider theme={themeOptions}>
        <CssBaseline />
        {isLoading ? (
          <Stack
            alignItems="center"
            sx={{
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <Fragment>
            <NavBar />
            <Notifications />
            <Routes>
              <Route element={<Home />} path={"/"} />
              <Route element={<ItemDetails />} path={"shop/:item"} />
              <Route element={<Shop />} path={"/shop"} />
              <Route element={<Checkout />} path={"/checkout"} />
              <Route element={<Navigate to={"/notfound"} />} path={"*"} />
              <Route element={<NotFound />} path={"/notfound"} />
            </Routes>
            <Footer />
          </Fragment>
        )}
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
