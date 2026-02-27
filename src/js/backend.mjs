import PocketBase from 'pocketbase';
const db = new PocketBase("http://127.0.0.1:8090");


export async function getOffres() {
    try {
        let data = await db.collection('Maison').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

export async function getOffre(id) {
    try {
        const data = await db.collection('maison').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function getOffresParSurface(surfaceMin) {
    try {
        const records = await db.collection('maison').getFullList({
            filter: `surface >= ${surfaceMin}`,
        });
        return records;
    } catch (error) {
        console.log('Erreur lors du filtrage par surface', error);
        return [];
    }
}


export async function addOffre(house) {
    try {
        await db.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}