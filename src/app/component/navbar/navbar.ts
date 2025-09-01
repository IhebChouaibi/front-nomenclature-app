import { ChangeDetectorRef, Component,  HostListener,  OnDestroy,  OnInit } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';
import { Exportdata } from '../exportdata/exportdata';
import { MatDialog } from '@angular/material/dialog';
import { ImportData } from '../../service/import-data';
import { AddNomenclature } from '../add-nomenclature/add-nomenclature';
import { Taric } from '../../service/taric';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../service/notification-service';
import { Subscription } from 'rxjs';
import { Notification } from '../../models/notification';
import { MesureResponse } from '../../models/mesure-response';
import { MesureService } from '../../service/mesure';
import { TraiterMesures } from '../traiter-mesures/traiter-mesures';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit , OnDestroy{
  private notificationSubscription!: Subscription;
  showNotif = false;
  notifications: Notification[] = [];
  isMobileMenuOpen = false ; 
  isUploading = false;
  uploadMessage = '';
  mesures: MesureResponse[] = [];
  constructor(public auth:AuthService,
    private importData : ImportData ,
    private router:  Router ,
     private cdr: ChangeDetectorRef,
    private dialog : MatDialog,
       private taricService: Taric,
       private snackBar :MatSnackBar,
           private notificationService: NotificationService,
           private mesureService :MesureService

   ){

  }
  
  ngOnInit() {
    console.log('Navbar initialized, user authenticated:', this.auth.isAuthenticated());
  console.log('User ID:', this.auth.getUserId());
  
  if (this.auth.isAuthenticated() && this.auth.getUserId()) {
    const userId = this.auth.getUserId();
  
     this.notificationService.getUserNotification(userId!).subscribe(
        (notifications: Notification[]) => {
          this.notifications = notifications;
          console.log("=====================================",notifications)
          this.cdr.detectChanges();
        }
      );
    console.log('Connecting to notifications for user ID:', userId);
    this.notificationService.connect(userId!);
  }
  
  this.notificationSubscription = this.notificationService.notification$.subscribe(
    (notification: any) => {
      console.log('Notification received in navbar:', notification);
      if (notification) {
        this.notifications.unshift(notification);
        this.cdr.detectChanges();
      }
    }
  );
  }

   ngOnDestroy() {
     if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
    this.notificationService.disconnect();
  }

  toggleMobileMenu(){
    this.isMobileMenuOpen =!this.isMobileMenuOpen
  }
logout(){
  this.auth.logout();
  this.router.navigate(['/login']);
}
goToHome() {
  this.router.navigate(['/home']);

}
goToTasks(){
  this.router.navigate(['/tasks']);
}
openAddFile(): void {
  const dialogRef = this.dialog.open(Exportdata, { width: '500px' });

  dialogRef.afterClosed().subscribe((file: File) => {
    if (file) {
      this.isUploading = true;
      this.uploadMessage = "Importation en cours…";
      this.cdr.detectChanges(); 
      this.importData.importData(file).subscribe({
        next: (res) => {
          this.uploadMessage = "✅ Importation réussie !";
          this.isUploading = false;
          console.log('Import successful::::::::::::::::', res);
                this.cdr.detectChanges(); 

          setTimeout(() => {
            this.uploadMessage = '';
                  this.cdr.detectChanges(); 

          }, 3000);
        },
        error: (err) => {
          console.error('Import error:::::::::::::::', err);
          this.uploadMessage = "❌ Erreur : " + (err?.error ?? 'Importation échouée.');
          this.isUploading = false;
                this.cdr.detectChanges(); 

        }
      });
    }
  });
}

openAddNomenclature() {
 const dialogRef = this.dialog.open(
  AddNomenclature

  , { width: '800px' ,
    disableClose: true
  }
); dialogRef.afterClosed().subscribe(formData => {
    if (formData) {
      this.createTaricWithDetails(formData);
    }
  });
}
 createTaricWithDetails(formData: any) {
   const request = {
    codeNomenclature: formData.codeNomenclature,
    dateDebutValid: formData.dateDebutValid,
    dateFinValid: formData.dateFinValid,
    suffixDto: formData.suffixDto,
      descriptions: formData.descriptions.map((d: any) => ({
      description: d.description,
      dateDebutValid: d.dateDebutValid,
      dateFinValid: d.dateFinValid,
      status: d.status ?? 1  
    })),
    notes: formData.notes || []};
    this.taricService.createTaric(request).subscribe({
         next: (response) => {
      console.log("✅ TARIC créé avec détails :", response);
      this.snackBar.open('TARIC créé avec succès !', 'Fermer', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
       this.cdr.detectChanges(); 
      
    },
    error: (err) => {
      console.error("❌ Erreur lors de la création :", err);
      this.snackBar.open('Erreur lors de la création du TARIC.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
    });
  }


   toggleNotif(event?: Event) {
  if (event) {
    event.stopPropagation(); 
  }
  this.showNotif = !this.showNotif;
 

}
getUnreadNotificationsCount(): number {
  if (!this.notifications || this.notifications.length === 0) {
    return 0;
  }
  
  return this.notifications.filter(notif => !notif.seen).length;
}
markAsRead(idNotif: number) {
  const notification = this.notifications.find(n => n.idNotif === idNotif);
  if (notification) {
    notification.seen = true;
    this.cdr.detectChanges();
  }
  
  this.notificationService.markNotifcationSeen(idNotif).subscribe({
    next: () => {
      console.log('Notification marquée comme lue');
       this.cdr.detectChanges(); 
    },
    error: (err) => {
      console.error('Erreur lors du marquage de la notification comme lue', err);
      if (notification) {
        notification.seen = false;
       
      }
    }
  });
}


  openTraiterDialog(mesureId: number,idNotif:number): void {
     this.markAsRead(idNotif);
    this.mesureService.getMesureById(mesureId).subscribe({
      next: (mesure) => {
        console.log("Mesure récupérée:", mesure);
        this.markAsRead(idNotif);
        const dialogRef = this.dialog.open(TraiterMesures, {
          width: '600px',
          data: { mesure: mesure,
            commentaire: mesure.commentaire
           }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result && result.success) {
            console.log('La mesure a été traitée', result.mesures);
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la mesure', err);
        this.snackBar.open('Erreur lors du chargement de la mesure', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

 transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSec < 60) return "à l'instant";
    if (diffMin < 60) return `il y a ${diffMin} min`;
    if (diffHrs < 24) return `il y a ${diffHrs} h`;
    if (diffDays === 1) return "hier";
    return `il y a ${diffDays} jours`;
  }
  


}