import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, removeMessage, selectMessages } from './lobby.slice';
import {
  Grid,
  Button,
  TextField,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import client from '../../app/feather';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

export function MessageList() {
  const messages = useSelector(selectMessages);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const messageService = client.service('messages');
  const theme = useTheme();
  const classes = useStyles(theme);

  useEffect(() => {
    const addMessageListener = (message) => {
      console.log(message);
      dispatch(addMessage(message));
    };
    const removeMessageListener = (message) => {
      console.log(message);
      dispatch(removeMessage(message));
    };

    messageService.on('created', addMessageListener);
    messageService.on('removed', removeMessageListener);
    return () => {
      messageService.removeListener('created', addMessageListener);
      messageService.removeListener('removed', removeMessageListener);
    };
  }, [dispatch, messageService]);

  return (
    <Grid item container xs={12} md={3} spacing={1} className={classes.root}>
      <Grid item xs={12}>
        <TextField
          aria-label="Send message"
          label="Send message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={() => messageService.create({ text: message })}>
          Create Message
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Message</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((message) => {
                return (
                  <TableRow key={message.uuid}>
                    <TableCell>
                      {message.user && message.user.displayName}
                    </TableCell>
                    <TableCell>{message.text}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => messageService.remove(message.uuid)}
                      >
                        x
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
