import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, switchMap } from 'rxjs';
import { Notification } from '../models/notification';
import { AuthService } from './auth-service';
import { HttpClient } from '@angular/common/http';

declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private stompClient: any;
  private notificationSubject = new BehaviorSubject<any>(null);
  private isConnected = false;
  private reconnectTimeout: any;
   private pollingSubscription: any;
  
  public notification$ = this.notificationSubject.asObservable();

  constructor(private authService: AuthService,
    private http :HttpClient
  ) { }

  connect(userId: number): void {
    console.log('🔄 Connecting to WebSocket...');
    
    try {
      const socket = new SockJS('http://localhost:8082/ws');
      this.stompClient = Stomp.over(socket);
      
      this.stompClient.debug = null;
      
      const token = this.authService.getToken();
      const headers = {
        Authorization: `Bearer ${token}`
      };
      
      this.stompClient.connect(headers, (frame: any) => {
        console.log('✅ Connected to WebSocket:', frame);
        this.isConnected = true;
        
        this.stompClient.subscribe(`/topic/notifications/${userId}`, 
          (message: any) => {
            this.processMessage(message);
          },
          { 'ack': 'client' } 
        );
      }, (error: any) => {
        console.error('❌ WebSocket connection error:', error);
        this.isConnected = false;
        this.scheduleReconnection(userId);
      });
    } catch (error) {
      console.error('❌ Error creating WebSocket connection:', error);
      this.scheduleReconnection(userId);
       console.error('WebSocket error, starting polling', error);
   
    }
  }
    loadNotifications(userId: number): void {
    this.getUserNotification(userId).subscribe(notifications => {
      this.notificationSubject.next(notifications);
    });
  }


  private processMessage(message: any): void {
    if (message.body) {
      try {
        const notification = JSON.parse(message.body);
         const currentNotifications = this.notificationSubject.value;
        this.notificationSubject.next([notification, ...currentNotifications]);
      } catch (e) {
        console.error('Error parsing notification:', e);
        }
      }
      
    }
  


getUserNotification(userId :number):Observable<Notification[]>{
  return this.http.get<Notification[]>(`http://localhost:8082/notification/${userId}`)
}

markNotifcationSeen(idNotification : number):Observable<Notification>{
  return this.http.patch<Notification>(`http://localhost:8082/notification/markAsSeen/${idNotification}` , {  })
};


  private scheduleReconnection(userId: number): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    
    this.reconnectTimeout = setTimeout(() => {
      console.log('🔄 Attempting reconnection...');
      this.connect(userId);
    }, 2000); 
  }

  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    
    if (this.stompClient && this.isConnected) {
      this.stompClient.disconnect();
      this.isConnected = false;
      console.log('🔌 Disconnected from WebSocket');
    }
  }
}