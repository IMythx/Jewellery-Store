import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useState, useLayoutEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  onChange: (filters: string[]) => void;
  children?: React.ReactNode;
}

const ColorsFilter = ({ onChange }: Props): JSX.Element => {
  const [filters, setFilters] = useState<string[]>(
    new URLSearchParams(location.search).getAll("COLOR") || []
  );

  const colors = ["Silver", "Gold", "Black"];

  const handleToggle = (value: string) => () => {
    const currentIndex = filters.indexOf(value);
    const newFilters = [...filters];

    if (currentIndex === -1) {
      newFilters.push(value);
    } else {
      newFilters.splice(currentIndex, 1);
    }

    setFilters(newFilters);
    onChange(newFilters);
  };

  useLayoutEffect(() => {
    filters.length && onChange(filters);
  }, []);

  return (
    <Accordion>
      <AccordionSummary
        sx={{
          "& .MuiAccordionSummary-content": {
            gap: "0.5rem",
            alignItems: "center",
          },
        }}
        expandIcon={
          <ExpandMoreIcon
            sx={{
              fontSize: "1.1rem",
            }}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          variant="body1"
          sx={{
            ml: 2,
          }}
        >
          Color
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List
          sx={{
            pt: 0,
            pl: "8px",
          }}
        >
          {colors.map((value, index) => {
            const labelId = `checkbox-list-label-${index}`;
            return (
              <ListItem
                key={index}
                disableGutters
                disablePadding
                sx={{
                  "& .MuiButtonBase-root.MuiListItemButton-root": {
                    py: 0.3,
                    "&:hover": {
                      backgroundColor: "inherit !important",
                    },
                  },
                  "& .MuiListItemIcon-root": {
                    minWidth: "auto",
                  },
                  "& span": {
                    py: 0,
                  },
                }}
              >
                <ListItemButton
                  onClick={handleToggle(value)}
                  dense
                  disableRipple
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={filters.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      size={"small"}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={
                      <Typography
                        variant="body2"
                        color={"text.secondary"}
                        fontWeight={600}
                        sx={{
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                      >
                        {value}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default ColorsFilter;
