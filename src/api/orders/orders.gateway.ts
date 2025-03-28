import { OrdersService } from './orders.service';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { OrderStatusEnum } from "src/constants/entity.constant";

@WebSocketGateway({
    cors: '*'
})
export class OrdersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private ordersService: OrdersService) {}
    @WebSocketServer() server: Server;

    handleConnection(client: Socket) {
        console.log(`Client connected:  ${client.id}`)
    }
    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }
    afterInit(server: Server) {
        console.log('WebSocket server initialized');
    }

    @SubscribeMessage('CLIENT_UPDATE_STATUS')
    async handleMessage(
        @MessageBody() data:{id: string, status: OrderStatusEnum}
    ) : Promise<void> {
        const {id, status} = data;
        const order = await this.ordersService.update(id, {status})
        this.server.emit('SERVER_UPDATE_STATUS',order) 
    }
    
    
}