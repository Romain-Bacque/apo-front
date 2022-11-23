// hook import
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// other import
import Add from "@mui/icons-material/Add";
import styled from "@emotion/styled";
// component import
import { Link, Navigate } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import BreweryCard from "../BreweryCard";
import CustomModal from "../../UI/CustomModal";
import SimpleModalContent from "../../UI/simpleModalContent";

// Style
const BreweriesContainer = styled(Container)({
  display: "block",
  height: "100%",
  maxWidth: "800px",
});
const Title = styled(Box)({
  padding: "1rem",
  borderBottom: "1px solid rgb(215, 215, 215)",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: 0.5,
});
const TitleText = styled(Typography)(({ theme }) => ({
  flex: 1.5,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    flex: 1,
  },
}));
const TitleButton = styled(Button)({
  flex: 1,
  fontSize: "1rem",
  marginTop: "1.2rem",
});
const BreweryCardBox = styled(Box)({
  marginTop: "4rem",
  overflow: "auto",
  height: "65vh",
});
const NoResultTypography = styled(Typography)({
  margin: "1.5rem",
  textAlign: "center",
});

let ownerBreweries = [];

// Component
function Breweries() {
  const [isOpen, setIsOpen] = useState(false);
  const isLogged = useSelector((state) => state.user.isLogged);
  const [breweryId, setBreweryId] = useState(null);
  const userId = useSelector((state) => state.user.id);
  const breweries = useSelector((state) => state.brewery.breweries);
  const dispatch = useDispatch();

  ownerBreweries = breweries?.filter((brewery) => brewery.user_id === userId);

  const handleModal = (id) => {
    setBreweryId(id);
    setIsOpen(true);
  };

  // Delete a brewery by its ID
  const handleBreweryDelete = () => {
    setIsOpen(false);
    if (breweryId && breweryId > 0) {
      dispatch({
        type: "DELETE_BREWERY",
        breweryId,
      });
    }
  };

  return (
    <>
      {/* If user is not connected, then it redirect to home page */}
      {!isLogged && <Navigate to="/" replace />}
      <CustomModal isOpen={isOpen}>
        <SimpleModalContent
          onValidate={handleBreweryDelete}
          onCancel={() => setIsOpen(false)}
          title="Suppression de la brasserie"
          description="Etes-vous sûr de vouloir supprimer cette brasserie ?"
        />
      </CustomModal>
      <BreweriesContainer>
        <Title>
          <TitleText variant="h4" component="h3">
            Mes brasseries
          </TitleText>
          <TitleButton
            startIcon={<Add />}
            component={Link}
            to="/brewery/breweryForm"
          >
            Ajouter une Brasserie
          </TitleButton>
        </Title>
        {ownerBreweries?.length > 0 ? (
          <BreweryCardBox>
            <Grid spacing={2} justifyContent="center" container>
              {ownerBreweries.map((brewery) => (
                <BreweryCard
                  id={brewery.id}
                  key={brewery.id}
                  image={brewery.image}
                  title={brewery.title}
                  address={brewery.address}
                  phone={brewery.phone}
                  onDelete={handleModal}
                />
              ))}
            </Grid>
          </BreweryCardBox>
        ) : (
          <NoResultTypography component="div">
            Aucune brasserie enregistrée.
          </NoResultTypography>
        )}
      </BreweriesContainer>
    </>
  );
}

export default Breweries;
