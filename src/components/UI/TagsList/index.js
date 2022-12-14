// hook import
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// component import
import Chip from "@mui/material/Chip";
// styled component import
import { ListItem, StyledPaper } from "./style";

// Component
function TagsList({ onTagDelete, list }) {
  const [chipData, setChipData] = useState([]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
    onTagDelete(chipToDelete);
  };

  useEffect(() => {
    setChipData(list);
  }, [list]);

  return (
    <StyledPaper variant="none" component="ul">
      {chipData.length > 0
        ? chipData.map((data) => {
            if (data.id && data.tag) {
              return (
                <ListItem key={data.id}>
                  <Chip
                    sx={{ fontSize: "0.95rem" }}
                    label={data.tag}
                    onDelete={onTagDelete && handleDelete(data)}
                  />
                </ListItem>
              );
            }
            return null;
          })
        : null}
    </StyledPaper>
  );
}

TagsList.propTypes = {
  onTagDelete: PropTypes.func,
  list: PropTypes.array.isRequired,
};

TagsList.defaultProps = {
  onTagDelete: null,
};

export default TagsList;
