declare module 'kafka-node' {

  export interface Client {

  }

  interface ClientFactory {
    new(connectionString: string, clientId: string, options?: Object): Client;
  }

  export interface HighLevelProducer {
    on(eventName: string, cb: () => void): void;
    send(payloads: Array<IProduceRequest>, cb: (error: any, data: any) => void): void;
  }

  export interface IProduceRequest {
    topic: string;
    messages: any;
  }

  export interface SingleMessageProduceRequest {
    messages: string;
  }
  export interface MultiMessageProduceRequest {
    messages: Array<string>;
  }

  interface HighLevelProducerFactory {
    new(client: Client): HighLevelProducer;
  }

  var Client: ClientFactory;
  var HighLevelProducer: HighLevelProducerFactory;

}
