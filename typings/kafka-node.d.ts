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
        on(eventName: string, cb: () => any): void;
        on(eventName: string, cb: (error: any) => any): void;
        send(payloads: Array<ProduceRequest>, cb: (error: any, data: any) => any): void;
        createTopics(topics: Array<string>, async: boolean, cb?: (error: any, data: any) => any): void;
    }

    interface ProducerFactory {
        new(client: Client): Producer;
    }

    // HighLevelProducer
    export interface HighLevelProducer {
        on(eventName: string, cb: () => any): void;
        on(eventName: string, cb: (error: any) => any): void;
        send(payloads: Array<ProduceRequest>, cb: (error: any, data: any) => any): void;
        createTopics(topics: Array<string>, async: boolean, cb?: (error: any, data: any) => any): void;
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

    // ProduceRequest
    interface ProduceRequest {
        topic: string;
        messages: any; // Array<string> | Array<KeyedMessage> | string | KeyedMessage
        partition?: number;
        attributes?: number;
    }

    // Consumer
    export interface Consumer {
        on(eventName: string, cb: (message: string) => any): void;
        on(eventName: string, cb: (error: any) => any): void;
        addTopics(topics: Array<string>, cb: (error: any, added: boolean) => any): void;
        addTopics(topics: Array<Topic>, cb: (error: any, added: boolean) => any, fromOffset: boolean): void;
        removeTopics(topics: Array<string>, cb: (error: any, removed: boolean) => any): void;
        commit(cb: (error: any, data: any) => any): void;
        setOffset(topic: string, partition: number, offset: number): void;
        pause(): void;
        resume(): void;
        pauseTopics(topics: Array<any> /* Array<string|Topic> */): void;
        resumeTopics(topics: Array<any> /* Array<string|Topic> */): void;
        close(force: boolean, cb: () => any): void;
    }

    interface ConsumerFactory {
        new(client: Client, fetchRequests: Array<Topic>, options: ConsumerOptions): Consumer;
    }

    export interface ConsumerOptions {
        groupId: string;
        autoCommit: boolean;
        autoCommitIntervalMs?: number;
        fetchMaxWaitMs?: number;
        fetchMinBytes?: number;
        fetchMaxBytes?: number;
        fromOffset?: boolean;
        encoding?: string;
    }

    // TopicWithOffset
    export interface Topic {
        topic: string;
        offset?: number;
    }

    // HighLevelConsumer
    export interface HighLevelConsumer {
        on(eventName: string, cb: (message: string) => any): void;
        on(eventName: string, cb: (error: any) => any): void;
        addTopics(topics: Array<string>, cb: (error: any, added: boolean) => any): void;
        addTopics(topics: Array<Topic>, cb: (error: any, added: boolean) => any, fromOffset: boolean): void;
        removeTopics(topics: Array<string>, cb: (error: any, removed: boolean) => any): void;
        commit(cb: (error: any, data: any) => any): void;
        setOffset(topic: string, partition: number, offset: number): void;
        pause(): void;
        resume(): void;
        pauseTopics(topics: Array<any> /* Array<string|Topic> */): void;
        resumeTopics(topics: Array<any> /* Array<string|Topic> */): void;
        close(force: boolean, cb: () => any): void;
    }

    export interface HighLevelConsumerFactory {
        new(client: Client, payloads: Array<Topic>, options: ConsumerOptions): HighLevelConsumer;
    }

    // Offset
    export interface Offset {
        on(eventName: string, cb: () => any): void;
        fetch(payloads: Array<OffsetRequest>, cb: (error: any, data: any) => any): void;
        commit(groupId: string, payloads: Array<OffsetCommitRequest>, cb: (error: any, data: any) => any): void;
        fetchCommits(groupId: string, payloads: Array<OffsetFetchRequest>, cb: (error: any, data: any) => any): void;
    }

    export interface OffsetFactory {
        new(client: Client): Offset;
    }

    export interface OffsetRequest {
        topic: string;
        partition?: number;
        time?: number;
        maxNum?: number;
    }

    export interface OffsetCommitRequest {
        topic: string;
        partition?: number;
        offset: number;
        metadata?: string;
    }

    export interface OffsetFetchRequest {
        topic: string;
        partition?: number;
    }

    // API
    var Client: ClientFactory;
    var KeyedMessage: KeyedMessageFactory;
    var Producer: ProducerFactory;
    var HighLevelProducer: HighLevelProducerFactory;
    var Consumer: ConsumerFactory;
    var HighLevelConsumer: HighLevelConsumerFactory;
    var Offset: OffsetFactory;

}
