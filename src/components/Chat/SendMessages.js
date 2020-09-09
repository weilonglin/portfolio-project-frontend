import React, { useState, useHistory } from "react";
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
  const [errors, setErrors] = useState({});

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    onError: (err) => setErrors(err.graphQLErrors),
  });

  const submitMessage = (e) => {
    e.preventDefault();
    console.log("variables", variables);
    sendMessage({ variables });
  };

  return (
    <Grid container style={{ padding: "20px" }}>
      <Grid item xs={11}>
        <TextField
          id="outlined-basic-email"
          label="Type Something..."
          fullWidth
          value={variables.message}
          onChange={(e) =>
            setVariables({ ...variables, message: e.target.value })
          }
        />
      </Grid>
      <Grid xs={1} align="right">
        <Fab color="primary" aria-label="add">
          <SendIcon onClick={submitMessage} />
        </Fab>
      </Grid>
    </Grid>
  );
}
