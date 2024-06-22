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
   },
   controller: function (body) {
      console.log('Controller /driver:', body);
   }
});

export default endpoint;
