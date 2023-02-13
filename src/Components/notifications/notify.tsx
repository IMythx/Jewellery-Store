import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import { useAppDispatch } from "../../hooks/hooks";
import { memo, forwardRef } from "react";

interface Props {
  notify: string;
  children?: React.ReactNode;
}

const Notify = ({ notify }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Stack
      p={"1rem 0.8rem"}
      bgcolor={"success.main"}
      sx={{
        borderRadius: "7px",
      }}
      alignItems={"center"}
      gap={"1rem"}
      direction={"row"}
    >
      <CheckCircleOutlineIcon /> added item successfully{" "}
      <CloseIcon
        sx={{ cursor: "pointer" }}
        onClick={() =>
          dispatch({
            type: `${notify}/CLOSE NOTIFICATION`,
            payLoad: notify,
          })
        }
      />
    </Stack>
  );
};

export default memo(Notify);
