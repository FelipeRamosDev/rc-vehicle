import { SerialEndpoint } from 'serial-peers';

const endpoint = new SerialEndpoint({
   path: '/driver',
   bodySchema: {
      x: {
         type: Number,
         required: true
      },
      y: {
         type: Number,
         required: true
      }
   }
});

export default endpoint;
