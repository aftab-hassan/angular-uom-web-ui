
import * as request from 'request'

export class batchLogger {  
   
      constructor(private config: any){ }

      log(messages: Array<any>){
            if(!messages || !messages.length) {
                  console.log('No log messages provided.')
                  return
            }
            
            request({
                  uri: this.config.clientSettings.clientLoggerEndpoint,
                  method: 'POST',
                  json: true,
                  body: messages.map(m=> Object.assign({ appId: this.config.clientSettings.logSource }, m))
            },
            (err, response, body)=> {       
                  err && console.log(err);
            })
      } 
      
}
