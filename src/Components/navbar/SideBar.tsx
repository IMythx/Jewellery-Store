import { Drawer } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { NavLink } from "react-router-dom";
import { data } from "./Menu";
interface Props {
  openDrawer: boolean;
  toggleDrawer: () => void;
}
const SideBar = ({ openDrawer, toggleDrawer }: Props) => {
  return (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={() => toggleDrawer()}
      sx={{
        zIndex: "500",
        "& .MuiDrawer-paper": {
          position: "relative",
          boxSizing: "border-box",
          width: {
            sm: "400px",
            xs: "300px",
          },
          backgroundImage: "none",
        },
      }}
    >
      <TreeView
        defaultExpandIcon={<ArrowForwardIcon sx={{ order: 2 }} />}
        defaultCollapseIcon={<ArrowDownwardIcon sx={{ order: 2 }} />}
        aria-label="file system navigator"
        sx={{
          width: "100%",
          position: "absolute",
          top: "20%",
          left: 0,
          overflowY: "auto",
          "& .MuiTreeItem-content": {
            py: "0.5rem",
            px: "1rem",
            "&.Mui-focused,&.Mui-selected": {
              backgroundColor: "#252525",
            },
          },
          "& .MuiTreeItem-iconContainer": {
            order: 2,
          },
          "& a": {
            textDecoration: "none",
            display: "block",
            color: "text.primary",
            "&:hover": {
              color: "primary.main",
            },
          },
        }}
      >
        <TreeItem
          nodeId="1"
          label="Type"
          sx={{
            "& a": {
              textDecoration: "none",
              color: `text.secondary`,
              display: "block",
              "&:hover": {
                color: "primary.main",
              },
            },
          }}
        >
          {Object.keys(data).map((key) => (
            <TreeItem key={key} nodeId={key} label={key}>
              {data[`${key}`].map((value) => (
                <TreeItem
                  key={value}
                  nodeId={value}
                  label={<NavLink to={"/shop"}>{value}</NavLink>}
                />
              ))}
            </TreeItem>
          ))}
        </TreeItem>
        <TreeItem
          nodeId="5"
          label={<NavLink to={"/shop"}>Best Selling</NavLink>}
        />
        <TreeItem nodeId="51" label={<NavLink to={"/shop"}>New</NavLink>} />
        <TreeItem nodeId="12" label={<NavLink to={"/shop"}>Popular</NavLink>} />
        <TreeItem nodeId="13" label={<NavLink to={"/shop"}>Sale</NavLink>} />
        <TreeItem nodeId="14" label={<NavLink to={"/shop"}>Viewall</NavLink>} />
      </TreeView>
    </Drawer>
  );
};

export default SideBar;
