import React from 'react';
import { io, connect } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';

// export const socket = io(URL, {
//   // autoConnect: false
// });

export const socket = connect(URL);

export const SocketContext: any = React.createContext(null);