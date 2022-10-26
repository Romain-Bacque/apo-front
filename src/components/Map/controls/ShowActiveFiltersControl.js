import styled from "@emotion/styled";
import {
  List,
  Divider,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@mui/material";

// Style
const StyledList = styled(List)({
  textAlign: "center",
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
});

// Active Filter functional component
const ShowActiveFiltersControl = ({ getFilters }) => {
  const { geoFilter, radiusFilter, searchValue } = getFilters();

  const getDisplayFilters = () => {
    const filtersToDisplay = [];

    if (searchValue) {
      filtersToDisplay.push("Barre de recherche");
    }

    if (geoFilter) {
      filtersToDisplay.push(geoFilter.properties.nom);
    }

    if (radiusFilter) {
      filtersToDisplay.push("Autour de moi");
    }

    return filtersToDisplay.length > 0 ? filtersToDisplay : ["Aucun filtre"];
  };

  // Active Filter functional component
  const RenderActiveFilters = () => {
    const filtersList = getDisplayFilters();

    return (
      <StyledList
        component="div"
        aria-labelledby="nested-list-subheader" // reference to text inside 'ListSubheader' component ('Filtre Actif')
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Filtre(s) Actif
          </ListSubheader>
        }
      >
        <Divider />
        {filtersList?.length > 0 &&
          filtersList.map((filter, index) => (
            <ListItem key={index} component="div">
              <ListItemText primary={filter} />
              <Divider />
            </ListItem>
          ))}
      </StyledList>
    );
  };

  return (
    // Override 'leaflet-bottom' and 'leaflet-left' classes
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control leaflet-bar leaflet-control-layers">
        <RenderActiveFilters />
      </div>
    </div>
  );
};

export default ShowActiveFiltersControl;