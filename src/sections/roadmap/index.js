import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    paddingBottom: "50px",
    "& .container": {
      borderTop: "2px solid white",
      padding: "10px 0",
    },
  },
  header: {
    fontSize: 60,
    marginBottom: 20,
    textTransform: "uppercase",
  },
  subheader: {
    fontSize: 40,
    marginBottom: 20,
    textTransform: "uppercase",
  },
  content: {
    marginTop: "100px",
    "& p": {
      maxWidth: "600px",
      width: "100%",
      margin: "5px auto",
    },
  },
});

const Index = () => {
  const classes = useStyles();
  return (
    <section className={classes.root} id="roadmap">
      <Container className="container">
        <Container maxWidth="md">
          <h2 className={classes.header}>Road map</h2>
          <div className={classes.content}>
            <h3 className={classes.subheader}>Currently working on</h3>
            <p>Releasing Rarity’s Chart</p>
            <p>Launch New Website and FightNight DaO</p>
            <p>Make Listings Available On All Marketplaces</p>
            <p>Launch Custom Merch</p>
            <p>Create Monkey Scavenger Hunt</p>
          </div>
          <div className={classes.content}>
            <h3 className={classes.subheader}>Up Next</h3>
            <p>Collaborate With Other Projects</p>
            <p>Produce Championship Belt NFTs</p>
            <p>Complete 8-bit MMA Monkeys Game</p>
          </div>
        </Container>
      </Container>
    </section>
  );
};

export default Index;
