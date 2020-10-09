import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { SEND_MESSAGE } from "../../graphql/queries";
import { useMutation } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";


export default function SendMessages(props) {
  const [variables, setVariables] = useState({
    userId: parseInt(props.userId),
    message: "",
    recipientId: props.id,
    recipientName: props.recipientName,
    imageUrl: props.img,
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.log(err.graphQLErrors),
  });

  const submitMessage = (e) => {
    e.preventDefault();
    
    sendMessage({ variables });
    setVariables({ ...variables, message: "" })
  };

  return (
    <Grid container style={{ padding: "20px" }}>
      <Grid item xs={11}>
        <form onSubmit={submitMessage}>
          <TextField
            id="outlined-basic-email"
            label="Type Something..."
            fullWidth
            value={variables.message}
            onChange={(e) =>
              setVariables({ ...variables, message: e.target.value })
            }
          />
        </form>
      </Grid>
      <Grid xs={1} item={true} align="right">
        <Fab color="primary" aria-label="add">
          <SendIcon onClick={submitMessage} />
        </Fab>
      </Grid>
    </Grid>
  );
}
