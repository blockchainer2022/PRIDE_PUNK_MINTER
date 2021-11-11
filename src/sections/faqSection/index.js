import { useState } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const accordianData = [
  {
    question: "Total supply of pride punks?",
    answer: "There will only be 5000 OG  pride punks. ",
  },
  {
    question: "What is the minting cost?",
    answer: ".5 SOL for all 5000  pride punks. ",
  },
  {
    question: "Where can i buyor sell pride punks?",
    answer:
      "After mint, a marketplace will be available on DigitalEyes. We will be working on other Marketplaces as well. ",
  },
  {
    question: "will my pride punks help me in a street fight?",
    answer:
      "Yes! It will help you fight like Conor Mcgregor (Minus The Leg Break).",
  },
];
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
    marginBottom: 10,
    textTransform: "uppercase",
  },
  accrodian: {
    textAlign: "center",
    color: "black",
    marginTop: 20,
    "& p": {
      color: "white",
    },
  },
  item: {
    backgroundColor: "white",
    padding: "10px 0",
    borderImageSlice: 1,
    border: "10px solid",
    borderWidth: "5px",
    borderImageSource:
      "linear-gradient(90deg, rgba(135,16,190,1) 0%, rgba(135,16,190,1) 16.7%, rgba(26,101,255,1) 33.4%, rgba(253,126,0,1) 50%, rgba(25,180,76,1) 50.1%, rgba(255,229,0,1) 66.8%, rgba(252,0,51,1) 83.5%, rgba(252,0,51,1) 100%)",
    cursor: "pointer",
  },
  show: {
    padding: "10px 0 0 0",
  },
  hidden: {
    overflow: "hidden",
    maxHeight: 0,
    height: 0,
  },
});

const Index = () => {
  const classes = useStyles();
  const [clicked, setClicked] = useState();

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  return (
    <section className={classes.root} id="faq">
      <Container className="container">
        <Container maxWidth="md">
          <h2 className={classes.header}>FAQ</h2>
          <div className="">
            {accordianData.map((v, i) => (
              <div key={i} className={classes.accrodian}>
                <div className={classes.item} onClick={() => toggle(i)}>
                  <h3 style={{ userSelect: "none" }}>{v.question}</h3>
                </div>
                <div
                  className={` ${
                    clicked === i ? classes.show : classes.hidden
                  }`}
                >
                  <p className="">{v.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Container>
    </section>
  );
};

export default Index;
