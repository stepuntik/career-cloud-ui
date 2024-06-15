import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Add data to Firestore
  addData(collectionName: string, data: any): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(collectionName).doc(id).set(data);
  }

  // Get data from Firestore (optional, if you need to retrieve data as well)
  getData(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).valueChanges();
  }
}
