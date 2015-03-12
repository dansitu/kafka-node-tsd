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
        on(eventName: string, cb: (error: Error) => void): void;
        send(payloads: any, cb: (error: Error, data: Object) => void): void;
        createTopics(topics: Array<string>, async: boolean, cb?: (error: Error, data: Object) => void): void;
    }

    interface ProducerFactory {
        new(client: Client): Producer;
    }

    // HighLevelProducer
    export interface HighLevelProducer {
        on(eventName: string, cb: () => void): void;
        on(eventName: string, cb: (error: Error) => void): void;
        send(payloads: Array<ProduceRequest>, cb: (error: Error, data: Object) => void): void;
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

    // ProduceRequest
    interface ProduceRequest {
        topic: string;
        partition?: number;
        attributes?: number;
    }

    // Consumer
    export interface Consumer {
        on(eventName: string, cb: (message: string) => void): void;
        on(eventName: string, cb: (error: Error) => void): void;
        addTopics(topics: Array<string>, cb: (error: Error, added: boolean) => void): void;
        addTopics(topics: Array<Topic>, cb: (error: Error, added: boolean) => void, fromOffset: boolean): void;
        removeTopics(topics: Array<string>, cb: (error: Error, removed: boolean) => void): void;
        commit(cb: (error: Error, data: any) => void): void;
        setOffset(topic: string, partition: number, offset: number): void;
        pause(): void;
        resume(): void;
        pauseTopics(topics: Array<any>): void;
        resumeTopics(topics: Array<any>): void;
        close(force: boolean, cb: () => void): void;
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
        on(eventName: string, cb: (message: string) => void): void;
        on(eventName: string, cb: (error: Error) => void): void;
        addTopics(topics: Array<string>, cb: (error: Error, added: boolean) => void): void;
        addTopics(topics: Array<Topic>, cb: (error: Error, added: boolean) => void, fromOffset: boolean): void;
        removeTopics(topics: Array<string>, cb: (error: Error, removed: boolean) => void): void;
        commit(cb: (error: Error, data: any) => void): void;
        setOffset(topic: string, partition: number, offset: number): void;
        pause(): void;
        resume(): void;
        pauseTopics(topics: Array<any>): void;
        resumeTopics(topics: Array<any>): void;
        close(force: boolean, cb: () => void): void;
    }

    export interface HighLevelConsumerFactory {
        new(client: Client, payloads: Array<Topic>, options: ConsumerOptions): HighLevelConsumer;
    }

    // Offset
    export interface Offset {
        on(eventName: string, cb: () => void): void;
        fetch(payloads: Array<OffsetRequest>, cb: (error: Error, data: any) => void): void;
        commit(groupId: string, payloads: Array<OffsetCommitRequest>, cb: (error: Error, data: any) => void): void;
        fetchCommits(groupId: string, payloads: Array<OffsetFetchRequest>, cb: (error: Error, data: any) => void): void;
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
