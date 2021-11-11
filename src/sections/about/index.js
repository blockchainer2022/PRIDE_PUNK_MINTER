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
    "& p": {
      fontSize: 30,
      marginBottom: 30,
    },
  },
  header: {
    fontSize: 60,
    marginBottom: 20,
    textTransform: "uppercase",
  },
});

const Index = () => {
  const classes = useStyles();
  return (
    <section className={classes.root} id="about">
      <Container className="container">
        <Container maxWidth="md">
          <h2 className={classes.header}>About</h2>
          <p>Well train monkeys ready to fight....</p>
        </Container>
      </Container>
    </section>
  );
};

export default Index;
