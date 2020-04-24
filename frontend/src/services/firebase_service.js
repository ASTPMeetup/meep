import { db } from "../firebase/firebase_init";

class FireBaseService {
    getLocations() {
        return new Promise((resolve, reject) => {
            db.ref('/locations').once('value', (snapshot) => {
                const locations_list = snapshot.val();
                if(locations_list) {
                    resolve(locations_list);
                } else {
                    reject('error locations from db');
                }
            });
        });
    }
}

export const firebase_service = new FireBaseService();