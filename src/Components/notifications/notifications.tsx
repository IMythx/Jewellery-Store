import { Stack } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";
import Notify from "./notify";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Notifications = (): JSX.Element => {
  const notifications = useAppSelector((state) => state.cart.notificationsName);

  return (
    <Stack
      sx={{
        position: "fixed",
        top: "1rem",
        right: 0,
        zIndex: 4999,
        alignItems: "flex-end",
        height: "fit-content",
        "& .item-enter ": {
          transform: "translateX(105%)",
        },
        "& .item-enter-active": {
          transform: " translateX(0%)",
          transition: "all 150ms ease-in",
        },
        "& .item-exit": {
          transform: "translateX(0%)",
        },
        "& .item-exit-active": {
          transform: "translateX(105%)",
          transition: "all 150ms ease-in",
        },
      }}
      pr={"1rem"}
      gap={"1rem"}
    >
      <TransitionGroup component={null}>
        {notifications.map(
          (notify, index) =>
            notify && (
              <CSSTransition key={index} timeout={150} classNames="item">
                <Notify notify={notify} />
              </CSSTransition>
            )
        )}
      </TransitionGroup>
    </Stack>
  );
};

export default Notifications;
