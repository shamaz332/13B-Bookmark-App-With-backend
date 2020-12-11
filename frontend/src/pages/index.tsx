import React, { useState, useEffect } from "react"
import { listBookmark } from "../graphql/queries"
import { createBookmark } from "../graphql/mutations"
import { API } from "aws-amplify"
import shortid from "shortid"
//material ui code
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        flexGrow: 1,
        minWidth: 345,
      },


    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
      maxWidth: 345,
      backgroundColor: "black",
      margin: 13,
      color: "white",
    },
  }),
);


interface book {
  name: string;
  url: string;
  description: string;
}

interface incomingData {
  data: {
    listBookmark: book[]
  }
}

export default function Home() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true)
  const [bookmarkData, setBookmarkData] = useState<incomingData | null>(null)

  let inputName
  let inputUrl
  let inputDescription

  const addBookmarkMutation = async () => {
    try {
      const task = {
        id: shortid.generate(),
        name: inputName.value,
        url: inputUrl.value,
        description: inputDescription.value,

      }
      const data = await API.graphql({
        query: createBookmark,
        variables: {
          task: task,
        },
      })

      fetchBookmark()
    } catch (e) {
      console.log(e)
    }
  }

  const fetchBookmark = async () => {
    try {
      const data = await API.graphql({
        query: listBookmark,
      })
      setBookmarkData(data as incomingData)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchBookmark()
  }, [])

  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
          <div>
            <Typography variant="h3" component="h2"> Bookmark Your Notes 💌 </Typography> <form className={classes.root} autoComplete="off"> <TextField required id="outlined-required" label="Name" variant="outlined" inputRef={node => { inputName = node }} /> <TextField required id="outlined-required" label="Url" variant="outlined" inputRef={node => { inputUrl = node }} /> <TextField required id="outlined-required" label="Description" variant="outlined" inputRef={node => { inputDescription = node }} /> </form> <br /><br /> <Button variant="contained" color="primary" onClick={addBookmarkMutation}>Add Bookmark</Button> <br /><br /> <Grid container> {bookmarkData.data && bookmarkData.data.listBookmark.map((d) => (<Card className={classes.card}> <CardActionArea> <CardContent> <Typography variant="h5" component="h2"> {d.name} </Typography> <Typography variant="body2" component="p"> {d.description} </Typography> <br />    <br /> <Button variant="contained" color="primary" href={d.url}> Learn More </Button> </CardContent> </CardActionArea> </Card>))} </Grid>
        </div>
  )
}
    </div >
     

  )
}
