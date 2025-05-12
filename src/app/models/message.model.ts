export interface MQMessage {
    messageId: string,

    correlationId: string,

    messageContent: string,

    messageTimestamp: number
}

export interface MessageListResponse {
    content: MQMessage[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}