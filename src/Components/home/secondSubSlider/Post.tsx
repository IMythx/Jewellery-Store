import { Stack, Box, Typography, Button } from "@mui/material";
import image1 from "../../../assets/3.jpg";
import image2 from "../../../assets/4.jpg";
import image3 from "../../../assets/11.jpg";
import image4 from "../../../assets/12.jpg";

interface Props {
  srcIndex: number;
  date: string;
  title: string;
  desc: string;
}

const Post = ({ srcIndex, date, title, desc }: Props): JSX.Element => {
  const imgsArray = [image1, image2, image3, image4];

  return (
    <Stack
      direction={{
        md: "row",
        between: "column",
        sm: "row",
        xs: "column",
      }}
      sx={{
        px: 2,
        "&:hover img": {
          scale: "1.05",
        },
      }}
      gap={"1.2rem"}
    >
      <Box
        sx={{
          width: {
            md: "55%",
            between: "auto",
            sm: "50%",
            xs: "auto",
          },
          overflow: "hidden",
          borderRadius: "7px",
        }}
      >
        <img
          style={{
            width: "100%",
            minHeight: "100%",
            transition: "all 300ms",
          }}
          src={imgsArray[srcIndex]}
          alt="post image"
        />
      </Box>
      <Stack
        justifyContent={"end"}
        gap={"1rem"}
        width={{
          md: "45%",
          between: "auto",
          sm: "50%",
          xs: "auto",
        }}
      >
        <Typography variant={"h6"} color={"text.secondary"}>
          {date}
        </Typography>
        <Typography
          variant={"h5"}
          color={"text.secondary"}
          width={{
            md: "90%",
            between: "auto",
            sm: "80%",
            xs: "auto",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant={"body1"}
          color={"text.secondary"}
          width={{
            md: "95%",
            between: "auto",
            sm: "85%",
            xs: "auto",
          }}
        >
          {desc}
        </Typography>
        <Button
          sx={{
            width: "fit-content",
            fontWeight: "400",
          }}
          variant="contained"
        >
          Read more
        </Button>
      </Stack>
    </Stack>
  );
};

export default Post;
