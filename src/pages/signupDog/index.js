import React, {useState, useHistory} from "react";

import {REGISTER_DOG} from "../../graphql/queries";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {useMutation} from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignupDog(props) {
  const id = localStorage.getItem("user");
  const classes = useStyles();
  const history = useHistory;
  const [variables, setVariables] = useState({
    name: "",
    gender: "",
    imageUrl: "",
    tagLine: "",
    ownerId: parseInt(id)
  });
  const [errors, setErrors] = useState({});

  const [registerDog, {
      loading
    }
  ] = useMutation(REGISTER_DOG, {
    update: (_, __) => props.history.push("/feed"),
    onError: (err) => setErrors(err.graphQLErrors[0])
  });

  const submitRegisterForm = (e) => {
    e.preventDefault();

    registerDog({variables});
  };

  return (<Container component="main" maxWidth="xs">
    <CssBaseline/>
    <div className={
      classes.paper
    }>
      <Avatar className={
        classes.avatar
      }>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Add your dog!
      </Typography>
      <form className={
          classes.form
        }
        onSubmit={submitRegisterForm}>
        <Grid container
          spacing={2}>
          <Grid item
            xs={12}
            sm={6}>
            <TextField autoComplete="fname" name="Name" variant="outlined" required fullWidth
              value={
                variables.name
              }
              onChange={
                (e) => setVariables({
                  ...variables,
                  name: e.target.value
                })
              }
              label="Name"
              autoFocus/>
          </Grid>
          <Grid item
            xs={12}
            sm={6}>
            <TextField variant="outlined" required fullWidth
              value={
                variables.gender
              }
              onChange={
                (e) => setVariables({
                  ...variables,
                  gender: e.target.value
                })
              }
              label="Gender"
              name="Gender"/>
          </Grid>

          <Grid item
            xs={12}>
            <TextField variant="outlined" required fullWidth
              value={
                variables.imageUrl
              }
              onChange={
                (e) => setVariables({
                  ...variables,
                  imageUrl: e.target.value
                })
              }
              label="Link your picture"
              name="imgurl"/>
          </Grid>
          <Grid item
            xs={12}>
            <TextField variant="outlined" required fullWidth name="tagLine" label="tagLine"
              value={
                variables.tagLine
              }
              onChange={
                (e) => setVariables({
                  ...variables,
                  tagLine: e.target.value
                })
              }/>
          </Grid>
        </Grid>
        <Button variant="contained" type="submit" color="primary"
          disabled={loading}
          fullWidth
          className={
            classes.submit
        }> {
          loading ? "loading.." : "Add dog"
        } </Button>

        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/feed" variant="body2">
              Already added your dogs? Go to the feed!
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>);
}
