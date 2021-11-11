/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar ,Container} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {RatitySection,TeamSection,AboutSection,RoadmapSection,FaqSection} from "./sections"
import Alert from "@material-ui/lab/Alert";
import Discord from "./assets/Discord.svg"
import Twitter from "./assets/Twitter.svg"
import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import {Header} from "./components"
import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "./candy-machine";
import * as dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'
const ConnectButton = styled(WalletDialogButton)``;

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

const MintButton = styled(Button)``; // add your styles here

const useStyles = makeStyles((theme)=>({
  root: {
   textAlign:"center",

   "& h1":{
     fontSize:"72px",
     margin:"20px 0 5px 0",
     [theme.breakpoints.down("md")]: {
     fontSize:"40px",
  
      
    },
   },
   "& p":{
    maxWidth:"1000px",
    width:"100%",
    margin:"0px auto 10px auto",
    fontSize:"30px",
    lineHeight:"24px",
    [theme.breakpoints.down("md")]: {
      fontSize:"24px",
   
       
     },
    
   },
   "& h4":{
     fontSize:"60px",
     marginTop:40,
     marginBottom:"0",
     textTransform:"uppercase"
     ,[theme.breakpoints.down("md")]: {
      fontSize:"48px",
   
       
     },

   },
   "&  .MuiButton-contained":{
    fontFamily: "Fixedsys Excelsior 3.01",
     fontSize:"36px",
     padding:"0px 20px",
     borderRadius:0,
     textTransform:"uppercase",
     border: "10px solid",
    borderImageSlice: 1,
    borderWidth: "5px",
    borderImageSource: "linear-gradient(90deg, rgba(135,16,190,1) 0%, rgba(135,16,190,1) 16.7%, rgba(26,101,255,1) 33.4%, rgba(253,126,0,1) 50%, rgba(25,180,76,1) 50.1%, rgba(255,229,0,1) 66.8%, rgba(252,0,51,1) 83.5%, rgba(252,0,51,1) 100%)"
    ,"& span":{
      display:"block",
      fontSize:"36px",
      lineHeight:1.3
    }

   }
  },
  walletWrapper:{
    maxWidth:"500px",
    width:"100%",
    margin:"auto"
  },
  icon:{
    display:"flex",
    justifyContent:"center",
    marginBottom:20

    ,"& a":{
      display:"block",
      marginLeft:10
    }
  },
  bottom:{
    textAlign:"center",
    marginTop:"40px",
    marginBottom:"50px",
    "& h6":{
        fontSize:"48px",
        marginBottom:"0"
    },
    "& p":{
      margin:0,
      maxWidth:"100%",
      marginTop:"0",
      
    }
  }


}));
export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}
dayjs.extend(utc)
dayjs.extend(customParseFormat)
const Home = (props: HomeProps) => {
  const classes = useStyles();
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
  // const [minCount, setMintCount] = useState(2)
  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);  
  const [seconds, setSeconds] = useState(0);
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const [startDate, setStartDate] = useState(new Date(props.startDate));

  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const refreshCandyMachineState = () => {
    (async () => {
      if (!wallet) return;

      const {
        candyMachine,
        goLiveDate,
        itemsAvailable,
        itemsRemaining,
        itemsRedeemed,
      } = await getCandyMachineState(
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection
      );

      setItemsAvailable(itemsAvailable);
      setItemsRemaining(itemsRemaining);
      setItemsRedeemed(itemsRedeemed);

      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  };

  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet && candyMachine?.program) {
   
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
      refreshCandyMachineState();
    }
  };
  // let startTime = ('11/04/2021T13:00:00.000+0000')
//  let startTime = ('11/04/2021T13:00:00.000+0000').replace(/(+\d{2})(\d{2})$/, "$1:$2")
  const difference = +dayjs.utc('2021-11-20T13:00:00.000+0000', 'YYYY-MM-DDTHH:mm:ss.000ZZ') - +new Date();

  useEffect(() => {
    const id = setTimeout(() => {
      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((difference / 1000 / 60) % 60));
        setSeconds(Math.floor((difference / 1000) % 60));
      }
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });
  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(refreshCandyMachineState, [
    wallet,
    props.candyMachineId,
    props.connection,
  ]);

  return (
    <main className="main-wrapper">
      <div className={`hero-section`}>
    <Header/>  
      <Container className={classes.root}>
        <h1><span style={{color:"#8710BE"}}>P</span><span style={{color:"#1A65FF"}}>R</span><span style={{color:"#19B44C"}}>I</span><span style={{color:"#FFE500"}}>D</span><span style={{color:"#FD7E00"}}>E</span> <span style={{color:"#FC0033"}}>P</span><span style={{color:"#8710BE"}}>U</span><span style={{color:"#1A65FF"}}>N</span><span style={{color:"#19B44C"}}>K</span></h1>
        <p>A collection of 5,000 algorithmically generated, collectible,
pride punk ready to fight for the championship.</p>   

       <div className={classes.icon}>
          <a href="#"><img src={Discord} alt="" /></a>
          <a href="#"><img src={Twitter} alt="" /></a>
       </div>
        <h4>Mint</h4>
        <p  style={{marginTop:"0"}}>MINT TIMES IS SEPTEMBER 14 TH 1:00 PM UTC TIME</p>
       { difference < 0 ?
       <div>
       <div className={classes.walletWrapper}>
       {wallet && (
        <p>Wallet {shortenAddress(wallet.publicKey.toBase58() || "")}</p>
      )}
        {wallet && <p className="wallet-item"><span> Balance: </span> <span> {(balance || 0).toLocaleString()} SOL </span> </p>}

{wallet && <p  className="wallet-item"> <span>Total Available: </span> <span> {itemsAvailable} </span></p>}

{wallet && <p className="wallet-item"><span> Redeemed: </span> <span> {itemsRedeemed}</span></p>}

{wallet && <p className="wallet-item"><span>Remaining: </span> <span>{itemsRemaining}</span> </p>}
        
       </div>
      
          <MintContainer>
          {!wallet ? (
           <div className="connect-wallet">
            <ConnectButton fullWidth>Mint Now</ConnectButton>
          </div>
          ) :(
            <MintButton
              disabled={isSoldOut || isMinting || !isActive}
              onClick={onMint}
              variant="contained"
         
            >
              {isSoldOut ? (
                "SOLD OUT"
              ) : isActive ? (
                isMinting ? (
                  <CircularProgress />
                ) : (
                  "MINT"
                ) 
              ) : (
                <Countdown
                  date={startDate}
                  onMount={({ completed }) => completed && setIsActive(true)}
                  onComplete={() => setIsActive(true)}
                  renderer={renderCounter}
                />
              )}
            </MintButton>
     
          )}
        </MintContainer> 
        </div>
       :(
         <>
          <p style={{fontSize:"40px",margin:"30px auto"}}>{days.toString().padStart(2,"0")}:{hours.toString().padStart(2,"0")}:{minutes.toString().padStart(2,"0")}:{seconds.toString().padStart(2,"0")}</p>
          <Button variant="contained" disabled>Mint now</Button>
        </>
        )}
      
   
          <div className={classes.bottom}>
            <h6>Minting cost?</h6>
            <p>0.5 sol for all 5000 unit</p>
          </div>
       
        </Container>
      </div>

          <RatitySection/>
          <TeamSection/>
          <AboutSection/>
          <RoadmapSection/>
          <FaqSection/>

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {hours + (days || 0) * 24} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Home;
