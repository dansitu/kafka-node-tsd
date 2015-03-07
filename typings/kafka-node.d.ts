// Type definitions for kafka-node 0.2.22
// Project: https://github.com/SOHU-Co/kafka-node/
// Definitions by: Daniel Imrie-Situnayake <https://github.com/dansitu/>
// Definitions: https://github.com/dansitu/kafka-node-tsd

declare module 'kafka-node' {

    // Client
    export interface Client {
        close(callback?: Function): void;
    }

    export interface ZKOptions {
        sessionTimeout?: number;
        spinDelay?: number;
        retries?: number;
    }

    interface ClientFactory {
        new(connectionString: string, clientId: string, options?: ZKOptions): Client;
    }

    // Producer
    export interface Producer {
        on(eventName: string, cb: () => void): void;
        send(payloads: any, cb: (error: Error, data: Object) => void): void;
        createTopics(topics: Array<string>, async: boolean, cb?: (error: Error, data: Object) => void): void;
    }

    interface ProducerFactory {
        new(client: Client): Producer;
    }

    // HighLevelProducer
    export interface HighLevelProducer {
        on(eventName: string, cb: () => void): void;
        send(payloads: Array<IProduceRequest>, cb: (error: Error, data: Object) => void): void;
        createTopics(topics: Array<string>, async: boolean, cb?: (error: Error, data: Object) => void): void;
    }

    interface HighLevelProducerFactory {
        new(client: Client): HighLevelProducer;
    }

    // KeyedMessage
    export interface KeyedMessage {

    }

    interface KeyedMessageFactory {
        new(key: string, message: string): KeyedMessage;
    }

    // ProduceRequests
    interface IProduceRequest {
        topic: string;
        partition?: number;
        attributes?: number;
    }

    // API
    var Client: ClientFactory;
    var KeyedMessage: KeyedMessageFactory;
    var Producer: ProducerFactory;
    var HighLevelProducer: HighLevelProducerFactory;

}
