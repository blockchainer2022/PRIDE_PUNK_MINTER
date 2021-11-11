import { Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image1 from "../../assets/1.png";
import Image2 from "../../assets/2.png";
import Image3 from "../../assets/3.png";
import Image4 from "../../assets/4.png";
import Image5 from "../../assets/5.png";
import Image6 from "../../assets/6.png";
import Image7 from "../../assets/7.png";
import Image8 from "../../assets/8.png";

const Images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8];

const useStyles = makeStyles({
  root: {
    padding: "0 0 50px 0",
    textAlign: "center",
    backgroundColor: "transparent",
    "& h2": {
      textAlign: "left",
      fontSize: "60px",
      marginBottom: "10px",
    },
    "& p": {
      fontSize: "30px",
    },
  },
  bottom: {
    marginTop: "30px",
    "& h3": {
      fontSize: "48px",
    },
    "& .MuiButton-contained": {
      marginTop: "20px",
      fontSize: "36px",
      padding: "0px 20px",
      borderRadius: 0,
      textTransform: "uppercase",
      border: "10px solid",
      borderImageSlice: 1,
      borderWidth: "5px",
      borderImageSource:
        "linear-gradient(90deg, rgba(135,16,190,1) 0%, rgba(135,16,190,1) 16.7%, rgba(26,101,255,1) 33.4%, rgba(253,126,0,1) 50%, rgba(25,180,76,1) 50.1%, rgba(255,229,0,1) 66.8%, rgba(252,0,51,1) 83.5%, rgba(252,0,51,1) 100%)",
    },
  },
});

const Index = () => {
  const classes = useStyles();
  return (
    <section className={classes.root} id="rarity">
      <Container maxWidth="md">
        <h2>RARITY</h2>
        <Grid container spacing={2}>
          {Images.map((v, i) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={i}>
              <img src={v} alt="" style={{ width: "100%" }} />
            </Grid>
          ))}
        </Grid>
        <div className={classes.bottom}>
          <h3>All Rarity</h3>
          <p>Show al rarity please click here</p>
          <Button variant="contained">View all</Button>
        </div>
      </Container>
    </section>
  );
};

export default Index;
