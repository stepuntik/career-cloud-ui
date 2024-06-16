import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Job } from '../interfaces/job.interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  addData(collectionName: string, data: Job): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(collectionName).doc(id).set(data);
  }

  getData(collectionName: string): Observable<any[]> {
    return this.firestore
      .collection(collectionName)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Job;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  updateData(collectionName: string, id: string, data: Job): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).update(data);
  }

  deleteData(collectionName: string, id: string): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).delete();
  }
}
