import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { forwardRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Toolbar, AppBar, Typography } from "@mui/material";
import { SportsBar } from "@mui/icons-material";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import AppMenu from "../UI/AppMenu";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
});

const Header = forwardRef((props, ref) => {
  const navigate = useNavigate();

  // If user type 'enter' key on keyboard
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      props.setSearchValue(event.target.value);
      navigate("/");
    }
  }

  // If user select an address in the search bar
  function handlePlaceSelect(value) {
    const searchValue = value ? value.properties.address_line1 : "";

    props.setSearchValue(searchValue);
    navigate("/");
  }

  return (
    <GeoapifyContext apiKey="99188fa618354504b3ba9155a71fb817">
      <AppBar
        ref={ref}
        position="sticky"
        sx={{
          boxShadow: "none",
        }}
      >
        <StyledToolbar>
          <Box display="flex" mr="4rem" alignItems={"center"} gap={1.5}>
            <Link to="/">
              <SportsBar
                sx={{
                  fontSize: "3.8rem",
                  color: "white",
                }}
                to="/"
              />
            </Link>
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                fontWeight: "bold",
                color: "white",
                fontSize: "1.4rem",
                width: "8rem",
              }}
              variant="span"
            >
              Biere de ta région.
            </Typography>
          </Box>
          <div
            tabIndex="0" // tabindex is an integer indicating whether the element can capture the focus and if so, in what order it captures it when navigating with the keyboard (usually using the Tab key).
            onKeyDown={handleKeyDown}
            style={{ width: "60%" }}
          >
            <GeoapifyGeocoderAutocomplete
              placeholder="Rechercher..."
              type="locality"
              lang="fr"
              placeSelect={handlePlaceSelect}
            />
          </div>
          <AppMenu />
        </StyledToolbar>
      </AppBar>
    </GeoapifyContext>
  );
});

export default Header;
